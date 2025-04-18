<template>
    <div class="w-full flex flex-col gap-2">
        <FormLabel :for="id">{{ label }}</FormLabel>
        <div class="relative">
            <div class="relative">
                <button type="button" :id="id" @click="toggleDropdown"
                    class="w-full flex items-center justify-between border-2 border-primary rounded-[9px] outline-none p-[0.65rem] pl-9">
                    <span v-if="selectedLabel" class="text-sm xl:text-base">{{ selectedLabel }}</span>
                    <span v-else class="text-gray text-sm xl:text-base">{{ placeholder }}</span>
                    <Icon name="material-symbols:keyboard-arrow-down-rounded" size="1.5rem"
                        class="text-primary self-end" />
                </button>
                <div v-if="icon" class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <Icon :name="`material-symbols:${icon}`" size="1.5rem" class="text-gray" />
                </div>

                <div v-if="isOpen"
                    class="w-full absolute z-10 bg-white border-2 border-primary rounded-md shadow-md overflow-auto mt-1">
                    <div v-for="option in options" :key="getOptionValue(option)" @click="selectOption(option)"
                        class="p-2 hover:text-primary transition-all duration-300 cursor-pointer">
                        <p class="text-sm xl:text-base">{{ getOptionLabel(option) }}</p>
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