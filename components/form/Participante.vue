<template>
    <form @submit.prevent="handleSubmit" class="w-full max-w-2xl mx-auto space-y-4">
        <FormTextField v-for="field in textFields" :key="field.id" v-bind="field" v-model="form[field.model]"
            :error="showErrors ? errors[field.model] : null" />

        <FormEmailField id="email" label="Mail" v-model="form.mail" icon="mail-outline-rounded" placeholder="Mail"
            :error="showErrors ? errors.mail : null" />

        <FormSelectField id="ciudad" label="Ciudad" v-model="form.ciudad" :options="ciudadesFormateadas"
            optionLabel="label" optionValue="value" placeholder="Seleccione una ciudad"
            icon="location-on-outline-rounded" :error="showErrors ? errors.ciudad : null" />

        <FormSelectField id="oficio" label="Oficio" v-model="form.oficio" :options="oficiosFormateados"
            optionLabel="label" optionValue="value" placeholder="Seleccione un oficio"
            icon="service-toolbox-outline-rounded" :error="showErrors ? errors.oficio : null" />

        <div class="flex items-start">
            <div class="flex items-center h-5">
                <input id="terminos" type="checkbox" v-model="form.terminos"
                    class="w-4 h-4 text-primary border-gray-300 rounded" />
            </div>
            <div class="ml-3 text-sm">
                <FormLabel for="terminos" class="text-gray-700">
                    Al inscribirme acepto <span class="text-error">bases y condiciones</span>
                </FormLabel>
                <DefaultError v-if="showErrors && errors.terminos">{{ errors.terminos }}</DefaultError>
            </div>
        </div>

        <div class="flex justify-center mt-6">
            <button type="submit" class="px-6 py-2 bg-primar rounded-md hover:bg-primary-dark transition-colors"
                :disabled="isSubmitting">
                {{ isSubmitting ? 'Enviando...' : 'Enviar' }}
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useEventosKlaukolStore } from '~/store/eventosKlaukol';
import { useOficiosStore } from '~/store/oficios';
import { useParticipanteService } from '~/composables/useParticipanteService';
import { useParticipanteValidation } from '~/composables/useParticipanteValidation';

const eventosStore = useEventosKlaukolStore();
const oficiosStore = useOficiosStore();
const { prepareParticipanteData, createParticipante } = useParticipanteService();
const {
    validateNombre,
    validateApellido,
    validateCiudad,
    validateTelefono,
    validateMail,
    validateOficio,
    validateTerminos,
    validateForm
} = useParticipanteValidation();

const form = ref({
    nombre: '',
    apellido: '',
    ciudad: null,
    telefono: '',
    mail: '',
    oficio: null,
    terminos: false
});

const errors = ref({
    nombre: null,
    apellido: null,
    ciudad: null,
    telefono: null,
    mail: null,
    oficio: null,
    terminos: null
});

const isSubmitting = ref(false);
const showErrors = ref(false);

const oficiosFormateados = computed(() => oficiosStore.oficiosParaSelect);

const ciudadesFormateadas = computed(() =>
    eventosStore.ciudadesDisponibles.map(ciudad => ({
        value: ciudad.id,
        label: ciudad.nombre
    }))
);

const textFields = [
    {
        id: 'nombre',
        label: 'Nombre',
        model: 'nombre',
        icon: 'account-circle',
        placeholder: 'Nombre'
    },
    {
        id: 'apellido',
        label: 'Apellido',
        model: 'apellido',
        icon: 'account-circle',
        placeholder: 'Apellido'
    },
    {
        id: 'telefono',
        label: 'Teléfono',
        model: 'telefono',
        icon: 'phone-iphone-outline',
        placeholder: 'Teléfono'
    }
];

const handleSubmit = async () => {
    showErrors.value = true;
    const isValid = await validateForm(form.value, errors.value);
    if (!isValid) return;

    isSubmitting.value = true;
    try {
        const participanteData = prepareParticipanteData(form.value);
        const resultado = await createParticipante(participanteData);
        if (resultado) {
            form.value = {
                nombre: '',
                apellido: '',
                ciudad: null,
                telefono: '',
                mail: '',
                oficio: null,
                terminos: false
            };
            showErrors.value = false;
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(async () => {
    if (eventosStore.ciudadesDisponibles.length === 0) await eventosStore.fetchEventos();
    if (oficiosStore.getOficios.length === 0) await oficiosStore.fetchOficios();
});
</script>