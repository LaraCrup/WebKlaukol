<template>
    <DefaultSection>
        <DefaultContent class="md:flex-row">
            <!-- Cambiar por video -->
            <picture class="md:w-1/2">
                <source media="(min-width: 1440px)" srcset="/videos/evento/Evento-Klaukol-DesktopXL.png" />
                <source media="(min-width: 1080px)" srcset="/videos/evento/Evento-Klaukol-Desktop.png" />
                <source media="(min-width: 660px)" srcset="/videos/evento/Evento-Klaukol-Tablet.png" />
                <NuxtImg src="/videos/evento/Evento-Klaukol-Mobile.png" alt="Klaukol Hero"
                    class="w-full h-full object-cover" />
            </picture>
            <div class="md:w-1/2 p-4 md:px-8">
                <div class="flex flex-col gap-2 rounded-[18px] shadow-1 p-4">
                    <DefaultH2 class="text-primary">
                        REGISTRATE PARA PARTICIPAR DE ESTE EVENTO ÚNICO
                    </DefaultH2>
                    <p class="text-xs">
                        ¡Demostrá tu destreza y sé el próximo campeón que llevará el nombre de Argentina al
                        escenario mundial!
                    </p>
                    <FormParticipante />
                </div>
            </div>
        </DefaultContent>
    </DefaultSection>
</template>