import { defineStore } from 'pinia';
import { useSupabaseClient } from '#imports';
import { useSupabaseCache } from '~/composables/useSupabaseCache';

export const useEventosKlaukolStore = defineStore('eventosKlaukol', {
    state: () => ({
        eventos: [],
        loading: false,
        error: null
    }),

    getters: {
        getEventos: (state) => state.eventos,
        isLoading: (state) => state.loading,

        // Obtener eventos ordenados por fecha (del más reciente al más antiguo)
        eventosOrdenados: (state) => {
            return [...state.eventos].sort((a, b) => {
                return new Date(b.fecha) - new Date(a.fecha);
            });
        },

        // Obtener ciudades disponibles para el select
        ciudadesDisponibles: (state) => {
            // Extraemos las ciudades únicas de los eventos
            const ciudadesUnicas = [...new Set(state.eventos.map(evento => evento.ciudad))];
            // Las ordenamos alfabéticamente
            return ciudadesUnicas.sort();
        }
    },

    actions: {
        async fetchEventos() {
            const { getFromCache, saveToCache } = useSupabaseCache();
            const cacheKey = 'eventos_klaukol_data';

            const cachedData = getFromCache(cacheKey);
            if (cachedData) {
                this.eventos = cachedData;
                this.refreshEventosInBackground();
                return;
            }

            this.loading = true;
            try {
                const supabase = useSupabaseClient();
                const { data, error } = await supabase
                    .from('eventos_klaukol')
                    .select('*')
                    .order('fecha', { ascending: false });

                if (error) throw error;

                this.eventos = data;
                saveToCache(cacheKey, data, 60); // Cache por 60 minutos
            } catch (error) {
                this.error = error.message;
                console.error('Error al cargar eventos de Klaukol:', error);
            } finally {
                this.loading = false;
            }
        },

        async refreshEventosInBackground() {
            try {
                const supabase = useSupabaseClient();
                const { data, error } = await supabase
                    .from('eventos_klaukol')
                    .select('*')
                    .order('fecha', { ascending: false });

                if (error) throw error;

                const { saveToCache } = useSupabaseCache();
                this.eventos = data;
                saveToCache('eventos_klaukol_data', data, 60);
            } catch (error) {
                console.error('Error en actualización en segundo plano:', error);
            }
        },

        // Obtener un evento específico por ID
        async fetchEventoPorId(id) {
            // Primero verificamos si ya está en el estado
            if (this.eventos.length > 0) {
                const eventoCache = this.eventos.find(e => e.id === id);
                if (eventoCache) return eventoCache;
            }

            try {
                const supabase = useSupabaseClient();

                const { data, error } = await supabase
                    .from('eventos_klaukol')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                return data;
            } catch (err) {
                console.error(`Error al obtener evento con ID ${id}:`, err);
                this.error = err.message;
                return null;
            }
        },

        // Si se necesita forzar una actualización (por ejemplo, después de una acción del usuario)
        async forceRefresh() {
            await this.fetchEventos();
        }
    }
});