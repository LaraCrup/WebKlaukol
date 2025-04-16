import { defineStore } from 'pinia';
import { useSupabaseClient } from '#imports';
import { useSupabaseCache } from '~/composables/useSupabaseCache';

export const useOficiosStore = defineStore('oficios', {
    state: () => ({
        oficios: [],
        loading: false,
        error: null
    }),

    getters: {
        getOficios: (state) => state.oficios,
        isLoading: (state) => state.loading,

        oficiosOrdenados: (state) => {
            return [...state.oficios].sort((a, b) =>
                a.nombre.localeCompare(b.nombre)
            );
        },

        oficiosParaSelect: (state) => {
            return state.oficios
                .map(oficio => ({
                    value: oficio.id,
                    label: oficio.nombre
                }))
                .sort((a, b) => a.label.localeCompare(b.label));
        }
    },

    actions: {
        async fetchOficios() {
            const { getFromCache, saveToCache } = useSupabaseCache();
            const cacheKey = 'oficios_data';

            const cachedData = getFromCache(cacheKey);
            if (cachedData) {
                this.oficios = cachedData;
                this.refreshOficiosInBackground();
                return;
            }

            this.loading = true;
            try {
                const supabase = useSupabaseClient();
                const { data, error } = await supabase
                    .from('oficios')
                    .select('*')
                    .order('nombre');

                if (error) throw error;

                this.oficios = data;
                saveToCache(cacheKey, data, 60);
            } catch (error) {
                this.error = error.message;
                console.error('Error al cargar oficios:', error);
            } finally {
                this.loading = false;
            }
        },

        async refreshOficiosInBackground() {
            try {
                const supabase = useSupabaseClient();
                const { data, error } = await supabase
                    .from('oficios')
                    .select('*')
                    .order('nombre');

                if (error) throw error;

                const { saveToCache } = useSupabaseCache();
                this.oficios = data;
                saveToCache('oficios_data', data, 60);
            } catch (error) {
                console.error('Error en actualización en segundo plano:', error);
            }
        },

        async fetchOficioPorId(id) {
            if (this.oficios.length > 0) {
                const oficioCache = this.oficios.find(o => o.id === id);
                if (oficioCache) return oficioCache;
            }

            try {
                const supabase = useSupabaseClient();
                const { data, error } = await supabase
                    .from('oficios')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                return data;
            } catch (err) {
                console.error(`Error al obtener oficio con ID ${id}:`, err);
                this.error = err.message;
                return null;
            }
        },

        async forceRefresh() {
            await this.fetchOficios();
        }
    }
});
