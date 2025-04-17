<template>
    <DefaultContent>
        <DefaultSection>
            <!-- Cambiar por video -->
            <NuxtImg src="/videos/Evento-Klaukol.png" class="w-full" />
            <div class="p-4">
                <div class="flex flex-col gap-2 rounded-[18px] shadow-form p-4">
                    <h2 class="text-2xl leading-6 text-primary font-semibold">
                        REGISTRATE PARA PARTICIPAR DE ESTE EVENTO ÚNICO
                    </h2>
                    <p class="text-xs">
                        ¡Demostrá tu destreza y sé el próximo campeón que llevará el nombre de Argentina al escenario mundial!
                    </p>
                    <FormParticipante />
                </div>
            </div>
        </DefaultSection>
    </DefaultContent>
</template>

<style scoped>
.shadow-form {
    box-shadow: 0px 2px 2px 0px #00000040;
}
</style>