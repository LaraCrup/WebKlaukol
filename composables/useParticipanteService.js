import { useSupabaseClient } from '#imports';
import { useNuxtApp } from '#app';

export const useParticipanteService = () => {
    const supabase = useSupabaseClient();
    const { $toast } = useNuxtApp();

    const createParticipante = async (participanteData) => {
        try {
            const { data, error } = await supabase
                .from('participantes')
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

    const checkEmailExists = async (email) => {
        try {
            const { data, error, count } = await supabase
                .from('participantes')
                .select('*', { count: 'exact', head: true })
                .eq('email', email);

            if (error) throw error;

            return count > 0;
        } catch (error) {
            console.error('Error al verificar email:', error);
            return false;
        }
    };

    const prepareParticipanteData = (formData) => {
        return {
            nombre: formData.nombre.trim(),
            apellido: formData.apellido.trim(),
            ciudad_id: formData.ciudad,
            telefono: formData.telefono.trim(),
            email: formData.email.trim().toLowerCase(),
            oficio_id: formData.oficio,
            acepto_terminos: formData.terminos,
            fecha_registro: new Date().toISOString()
        };
    };

    return {
        createParticipante,
        checkEmailExists,
        prepareParticipanteData
    };
};