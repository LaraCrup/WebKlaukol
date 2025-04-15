<template>
    <div class="w-full flex flex-col gap-2">
        <FormLabel :for="id">{{ label }}</FormLabel>
        <div class="relative">
            <input :id="id" type="email" :placeholder="placeholder" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value); $emit('input', $event.target.value)"
                :autocomplete="autocomplete" class="w-full border rounded-md p-2 pl-10" />
            <div v-if="icon" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon :name="`material-symbols:${icon || 'mail'}`" class="text-gray-500" />
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
        error: {
            type: String,
            default: null
        },
        modelValue: {
            type: String,
            default: ''
        },
        autocomplete: {
            type: String,
            default: 'email'
        },
        placeholder: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: 'mail'
        }
    },
    emits: ['update:modelValue', 'input']
}
</script>