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

        eventosOrdenados: (state) => {
            return [...state.eventos].sort((a, b) =>
                a.nombre_ciudad.localeCompare(b.nombre_ciudad)
            );
        },

        ciudadesDisponibles: (state) => {
            const mapa = new Map();

            for (const evento of state.eventos) {
                if (evento.id && evento.nombre_ciudad && !mapa.has(evento.id)) {
                    mapa.set(evento.id, {
                        id: evento.id,
                        nombre: evento.nombre_ciudad
                    });
                }
            }

            return Array.from(mapa.values()).sort((a, b) => a.nombre.localeCompare(b.nombre));
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
                    .order('nombre_ciudad', { ascending: true });

                if (error) throw error;

                this.eventos = data;
                saveToCache(cacheKey, data, 60); // 60 minutos
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
                    .order('nombre_ciudad', { ascending: true });

                if (error) throw error;

                const { saveToCache } = useSupabaseCache();
                this.eventos = data;
                saveToCache('eventos_klaukol_data', data, 60);
            } catch (error) {
                console.error('Error en actualización en segundo plano:', error);
            }
        },

        async fetchEventoPorId(id) {
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

        async forceRefresh() {
            await this.fetchEventos();
        }
    }
});
