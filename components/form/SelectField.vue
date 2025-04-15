<template>
    <div class="w-full flex flex-col gap-2">
        <FormLabel :for="id">{{ label }}</FormLabel>
        <div class="relative">
            <div class="relative">
                <button type="button" :id="id" @click="toggleDropdown"
                    class="w-full border rounded-md p-2 pl-10 text-left flex justify-between items-center">
                    <span v-if="selectedLabel">{{ selectedLabel }}</span>
                    <span v-else class="text-gray-400">{{ placeholder }}</span>
                    <Icon name="material-symbols:arrow-drop-down" class="text-gray-500" />
                </button>
                <div v-if="icon" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon :name="`material-symbols:${icon}`" class="text-gray-500" />
                </div>

                <!-- Opciones del dropdown -->
                <div v-if="isOpen"
                    class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    <div v-for="option in options" :key="getOptionValue(option)" @click="selectOption(option)"
                        class="p-2 hover:bg-gray-100 cursor-pointer">
                        {{ getOptionLabel(option) }}
                    </div>
                </div>
            </div>
        </div>
        <DefaultError v-if="error">
            {{ error }}
        </DefaultError>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        optionLabel: {
            type: String,
            default: 'label'
        },
        optionValue: {
            type: String,
            default: 'value'
        },
        modelValue: {
            type: [String, Number, Object],
            default: null
        },
        placeholder: {
            type: String,
            default: 'Seleccionar'
        },
        error: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: 'list'
        }
    },
    emits: ['update:modelValue', 'change'],
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        selectedLabel() {
            if (!this.modelValue || !this.options.length) return null;

            const selectedOption = this.options.find(option =>
                this.getOptionValue(option) === this.modelValue
            );

            return selectedOption ? this.getOptionLabel(selectedOption) : null;
        }
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        closeDropdown() {
            this.isOpen = false;
        },
        getOptionValue(option) {
            return typeof option === 'object' ? option[this.optionValue] : option;
        },
        getOptionLabel(option) {
            return typeof option === 'object' ? option[this.optionLabel] : option;
        },
        selectOption(option) {
            const value = this.getOptionValue(option);
            this.$emit('update:modelValue', value);
            this.$emit('change', value);
            this.closeDropdown();
        }
    },
    mounted() {
        // Cerrar el dropdown al hacer clic fuera del componente
        document.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)) {
                this.closeDropdown();
            }
        });
    },
    beforeUnmount() {
        document.removeEventListener('click', this.closeDropdown);
    }
}
</script>