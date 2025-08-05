<template>
    <DefaultSection>
        <DefaultContent class="md:h-[720px] lg:h-[800px] xl:h-[900px] 2xl:h-[1000px] md:flex-row">
            <video class="md:w-1/2 w-full h-full object-cover" autoplay muted loop playsinline>
                <source src="/videos/evento/Evento-Klaukol.mp4" type="video/mp4" media="(min-width: 660px)" />
                <source src="/videos/evento/Evento-Klaukol-Mobile.mp4" type="video/mp4" />
            </video>
            <div class="md:w-1/2 flex justify-center items-center p-4 md:px-8 xl:p-8 xl:pr-16">
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