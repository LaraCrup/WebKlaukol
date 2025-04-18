<template>
    <DefaultSection>
        <DefaultContent class="md:flex-row">
            <!-- Cambiar por video -->
            <picture class="md:w-1/2">
                <source media="(min-width: 1440px)" srcset="/videos/evento/Evento-Klaukol-DesktopXL.png" />
                <source media="(min-width: 1080px)" srcset="/videos/evento/Evento-Klaukol-Desktop.png" />
                <source media="(min-width: 660px)" srcset="/videos/evento/Evento-Klaukol-Tablet.png" />
                <NuxtImg src="/videos/evento/Evento-Klaukol-Mobile.png" alt="Evento Klaukol"
                    class="w-full h-full object-cover" />
            </picture>
            <div class="md:w-1/2 p-4 md:px-8 xl:p-8 xl:pr-16">
                <div class="flex flex-col gap-2 xl:gap-3 bg-lightGray rounded-[1.125rem] shadow-1 p-4 xl:p-6">
                    <DefaultH2 class="text-primary">
                        REGISTRATE PARA PARTICIPAR DE ESTE EVENTO ÚNICO
                    </DefaultH2>
                    <p class="text-xs xl:text-base 2xl:text-xl">
                        ¡Demostrá tu destreza y sé el próximo campeón que llevará el nombre de Argentina al
                        escenario mundial!
                    </p>
                    <FormParticipante />
                </div>
            </div>
        </DefaultContent>
    </DefaultSection>
</template>