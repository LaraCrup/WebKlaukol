import { useSupabaseClient } from '#imports';
import { useNuxtApp } from '#app';

export const useParticipanteService = () => {
    const supabase = useSupabaseClient();
    const { $toast } = useNuxtApp();

    const createParticipante = async (participanteData) => {
        try {
            const { data, error } = await supabase
                .from('participantes_klaukol')
                .insert(participanteData)
                .select()
                .single();

            if (error) throw error;

            $toast?.success('¡Participante registrado con éxito!');
            return data;
        } catch (error) {
            console.error('Error al crear participante:', error);
            $toast?.error(`Error al registrar participante: ${error.message || 'Error desconocido'}`);
            return null;
        }
    };

    const checkMailExists = async (mail) => {
        try {
            const { data, error, count } = await supabase
                .from('participantes_klaukol')
                .select('*', { count: 'exact', head: true })
                .eq('mail', mail);

            if (error) throw error;

            return count > 0;
        } catch (error) {
            console.error('Error al verificar mail:', error);
            return false;
        }
    };

    const prepareParticipanteData = (formData) => {
        return {
            nombre: formData.nombre.trim(),
            apellido: formData.apellido.trim(),
            ciudad_id: formData.ciudad,
            telefono: formData.telefono.trim(),
            mail: formData.mail.trim().toLowerCase(),
            oficio_id: formData.oficio,
        };
    };

    return {
        createParticipante,
        checkMailExists,
        prepareParticipanteData
    };
};