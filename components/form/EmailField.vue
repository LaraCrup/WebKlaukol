<template>
    <div class="w-full flex flex-col gap-2">
        <FormLabel :for="id">{{ label }}</FormLabel>
        <div class="relative">
            <input :id="id" type="email" :placeholder="placeholder" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value); $emit('input', $event.target.value)"
                :autocomplete="autocomplete" class="w-full border-2 border-primary rounded-[9px] text-sm xl:text-base 2xl:text-xl outline-none p-[0.65rem] pl-9 2xl:pl-10 placeholder:text-gray placeholder:text-sm xl:placeholder:text-base 2xl:placeholder:text-xl" />
            <div v-if="icon" class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                <Icon :name="`material-symbols:${icon}`" size="1.5rem" class="text-gray" />
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