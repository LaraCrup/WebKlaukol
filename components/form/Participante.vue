<template>
    <form @submit.prevent="handleSubmit" class="w-full flex flex-col gap-2">
        <FormTextField id="nombre" label="Nombre" v-model="form.nombre" icon="account-circle-full" placeholder="Nombre"
            :error="showErrors ? errors.nombre : null" />

        <FormTextField id="apellido" label="Apellido" v-model="form.apellido" icon="account-circle-full"
            placeholder="Apellido" :error="showErrors ? errors.apellido : null" />

        <FormSelectField id="ciudad" label="Ciudad" v-model="form.ciudad" :options="ciudadesFormateadas"
            optionLabel="label" optionValue="value" placeholder="Ciudad" icon="location-on-outline-rounded"
            :error="showErrors ? errors.ciudad : null" />

        <FormTextField id="telefono" label="Teléfono" v-model="form.telefono" icon="phone-iphone-outline"
            placeholder="Teléfono" :error="showErrors ? errors.telefono : null" />

        <FormEmailField id="email" label="Mail" v-model="form.mail" icon="mail-outline-rounded" placeholder="Mail"
            :error="showErrors ? errors.mail : null" />

        <FormSelectField id="oficio" label="Oficio" v-model="form.oficio" :options="oficiosFormateados"
            optionLabel="label" optionValue="value" placeholder="Oficio"
            icon="service-toolbox-outline-rounded" :error="showErrors ? errors.oficio : null" />

        <div class="flex items-center mt-1">
            <div class="relative w-6 h-6 flex items-center justify-center">
                <input id="terminos" type="checkbox" v-model="form.terminos"
                    class="w-[1.125rem] h-[1.125rem] border-2 border-primary rounded appearance-none checked:bg-primary cursor-pointer focus:outline-none" />
                <svg v-if="form.terminos" class="absolute w-3 h-3 pointer-events-none text-white" viewBox="0 0 24 24"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <div class="ml-1">
                <label for="terminos" class="text-xs xl:text-base 2xl:text-xl text-gray cursor-pointer">
                    Al inscribirme <span class="text-primary">acepto bases y condiciones</span>
                </label>
                <DefaultError v-if="showErrors && errors.terminos">{{ errors.terminos }}</DefaultError>
            </div>
        </div>

        <button type="submit" class="bg-primary rounded-[9px] text-white md:text-xl 2xl:text-2xl font-semibold p-3 mt-2 md:mt-4"
            :disabled="isSubmitting">
            {{ isSubmitting ? 'REGISTRANDO...' : 'REGISTRARME' }}
        </button>
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
const { validateForm } = useParticipanteValidation();

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