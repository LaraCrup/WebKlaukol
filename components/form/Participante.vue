<template>
    <form @submit.prevent="handleSubmit" class="w-full max-w-2xl mx-auto space-y-4">
        <!-- Campo Nombre -->
        <TextField id="nombre" label="Nombre" v-model="form.nombre" icon="account-circle" placeholder="Nombre"
            :error="errors.nombre" @input="validateNombre" />

        <!-- Campo Apellido -->
        <TextField id="apellido" label="Apellido" v-model="form.apellido" icon="account-circle" placeholder="Apellido"
            :error="errors.apellido" @input="validateApellido" />

        <!-- Campo Ciudad (Select) -->
        <SelectField id="ciudad" label="Ciudad" v-model="form.ciudad" :options="ciudadesFormateadas" optionLabel="label"
            optionValue="value" placeholder="Seleccione una ciudad" icon="location-on" :error="errors.ciudad"
            @change="validateCiudad" />

        <!-- Campo Teléfono -->
        <TextField id="telefono" label="Teléfono" v-model="form.telefono" icon="phone" placeholder="Teléfono"
            :error="errors.telefono" @input="validateTelefono" />

        <!-- Campo Email -->
        <EmailField id="email" label="Mail" v-model="form.email" icon="mail" placeholder="Email" :error="errors.email"
            @input="validateEmail" />

        <!-- Campo Oficio (Select) -->
        <SelectField id="oficio" label="Oficio" v-model="form.oficio" :options="oficiosFormateados" optionLabel="label"
            optionValue="value" placeholder="Seleccione un oficio" icon="work" :error="errors.oficio"
            @change="validateOficio" />

        <!-- Términos y condiciones -->
        <div class="flex items-start">
            <div class="flex items-center h-5">
                <input id="terminos" type="checkbox" v-model="form.terminos" @change="validateTerminos"
                    class="w-4 h-4 text-primary border-gray-300 rounded" />
            </div>
            <div class="ml-3 text-sm">
                <label for="terminos" class="text-gray-700">
                    Al inscribirme acepto <span class="text-error">bases y condiciones</span>
                </label>
                <DefaultError v-if="errors.terminos">{{ errors.terminos }}</DefaultError>
            </div>
        </div>

        <!-- Botón de envío -->
        <div class="flex justify-center mt-6">
            <button type="submit"
                class="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                :disabled="isSubmitting">
                {{ isSubmitting ? 'Enviando...' : 'Enviar' }}
            </button>
        </div>
    </form>
</template>

<script>
import { useEventosKlaukolStore } from '~/store/eventosKlaukol';
import { useOficiosStore } from '~/store/oficios';
import { useParticipanteService } from '~/composables/useParticipanteService';
import { useParticipanteValidation } from '~/composables/useParticipanteValidation';

export default {
    setup() {
        // Stores
        const eventosStore = useEventosKlaukolStore();
        const oficiosStore = useOficiosStore();

        // Servicios y validaciones
        const { prepareParticipanteData, createParticipante } = useParticipanteService();
        const {
            validateNombre: validaNombre,
            validateApellido: validaApellido,
            validateCiudad: validaCiudad,
            validateTelefono: validaTelefono,
            validateEmail: validaEmail,
            validateOficio: validaOficio,
            validateTerminos: validaTerminos,
            validateForm
        } = useParticipanteValidation();

        // Estado del formulario
        const form = ref({
            nombre: '',
            apellido: '',
            ciudad: null,
            telefono: '',
            email: '',
            oficio: null,
            terminos: false
        });

        // Estado de errores
        const errors = ref({
            nombre: null,
            apellido: null,
            ciudad: null,
            telefono: null,
            email: null,
            oficio: null,
            terminos: null
        });

        const isSubmitting = ref(false);

        // Formatear ciudades para el selector
        const ciudadesFormateadas = computed(() => {
            return eventosStore.ciudadesDisponibles.map(ciudad => ({
                value: typeof ciudad === 'object' ? ciudad.id : ciudad,
                label: typeof ciudad === 'object' ? ciudad.nombre : ciudad
            }));
        });

        // Formatear oficios para el selector
        const oficiosFormateados = computed(() => {
            return oficiosStore.oficiosParaSelect;
        });

        // Métodos de validación
        const validateNombre = (value) => {
            validaNombre(value, errors.value);
        };

        const validateApellido = (value) => {
            validaApellido(value, errors.value);
        };

        const validateCiudad = (value) => {
            validaCiudad(value, errors.value);
        };

        const validateTelefono = (value) => {
            validaTelefono(value, errors.value);
        };

        const validateEmail = (value) => {
            validaEmail(value, errors.value, true);
        };

        const validateOficio = (value) => {
            validaOficio(value, errors.value);
        };

        const validateTerminos = () => {
            validaTerminos(form.value.terminos, errors.value);
        };

        // Envío del formulario
        const handleSubmit = async () => {
            // Validar todos los campos
            const isValid = await validateForm(form.value, errors.value);

            if (!isValid) {
                return;
            }

            isSubmitting.value = true;

            try {
                // Preparar datos para enviar
                const participanteData = prepareParticipanteData(form.value);

                // Crear participante
                const resultado = await createParticipante(participanteData);

                if (resultado) {
                    // Resetear formulario después de envío exitoso
                    form.value = {
                        nombre: '',
                        apellido: '',
                        ciudad: null,
                        telefono: '',
                        email: '',
                        oficio: null,
                        terminos: false
                    };
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
            } finally {
                isSubmitting.value = false;
            }
        };

        // Cargar datos necesarios al montar el componente
        onMounted(async () => {
            // Cargar ciudades y oficios si aún no están cargados
            if (eventosStore.ciudadesDisponibles.length === 0) {
                await eventosStore.fetchEventos();
            }

            if (oficiosStore.getOficios.length === 0) {
                await oficiosStore.fetchOficios();
            }
        });

        return {
            form,
            errors,
            isSubmitting,
            ciudadesFormateadas,
            oficiosFormateados,
            validateNombre,
            validateApellido,
            validateCiudad,
            validateTelefono,
            validateEmail,
            validateOficio,
            validateTerminos,
            handleSubmit
        };
    }
}
</script>