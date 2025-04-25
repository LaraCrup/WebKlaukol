<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div v-if="visible" class="flex items-center justify-center fixed z-50 inset-0 bg-black bg-opacity-50">
                <div class="w-full max-w-sm xl:max-w-md relative bg-white rounded-[18px] text-center shadow-lg mx-4 py-8 px-6">
                    <button class="flex items-center justify-center absolute top-4 right-4" @click="closeModal">
                        <Icon name="material-symbols:close-rounded" size="1.5rem" class="text-primary" />
                    </button>
                    <Icon name="material-symbols:check-circle-outline-rounded" size="6rem" class="text-primary" />

                    <div class="flex flex-col gap-2">
                        <h2 class="flex flex-col text-primary font-semibold text-2xl xl:text-3xl">¡FELICITACIONES!<span>YA ESTÁS
                                INSCRIPTO EN EL EVENTO DEL AÑO</span></h2>

                        <p class="text-gray-700 text-sm xl:text-base">
                            Hemos registrado tu solicitud exitosamente y estaremos comunicándonos con vos a la brevedad.
                        </p>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>