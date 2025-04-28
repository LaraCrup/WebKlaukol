<template>
    <DefaultSection>
        <DefaultContent class="md:max-h-[460px] xl:max-h-[510px] 2xl:max-h-[600px] md:flex-row-reverse">
            <picture class="md:w-1/2">
                <source media="(min-width: 1440px)" srcset="/images/home/acerca/Acerca-Evento-Klaukol-DesktopXL.webp" />
                <source media="(min-width: 1080px)" srcset="/images/home/acerca/Acerca-Evento-Klaukol-Desktop.webp" />
                <source media="(min-width: 660px)" srcset="/images/home/acerca/Acerca-Evento-Klaukol-Tablet.webp" />
                <NuxtImg src="/images/home/acerca/Acerca-Evento-Klaukol-Mobile.webp" alt="Acerca del Evento Klaukol"
                    class="w-full h-full object-cover" />
            </picture>
            <div class="md:w-1/2 flex flex-col justify-center items-center gap-6 p-4 md:pl-8 xl:p-8">
                <div class="max-w-[444px] 2xl:max-w-[550px] flex flex-col gap-1 2xl:gap-2">
                    <DefaultSubtitle>
                        ACERCA DEL EVENTO
                    </DefaultSubtitle>
                    <DefaultH2 class="text-primary">EN BUSCA DEL COLOCADOR KLAUKOL</DefaultH2>
                </div>
                <div class="flex flex-col gap-3">
                    <div v-for="(actividad, index) in actividades" :key="index" class="max-w-[444px] 2xl:max-w-[550px] flex flex-col md:flex-row gap-2 md:gap-4 xl:gap-6">
                        <Icon :name="`material-symbols:${actividad.icon}`" class="w-9 md:w-9 xl:w-12 h-9 md:h-9 xl:h-12 text-primary" />
                        <div class="w-full">
                            <p class="font-semibold text-sm xl:text-base 2xl:text-xl">{{ actividad.title }}</p>
                            <p class="text-xs xl:text-sm xl:leading-6 2xl:text-base">{{ actividad.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultContent>
    </DefaultSection>
</template>

<script setup>
const actividades = [
    {
        icon: "social-leaderboard-outline-rounded",
        title: "Competencias prácticas en Vivo",
        description: "Desafíos y pruebas en tiempo real donde los participantes demuestran sus habilidades.",
    },
    {
        icon: "thumbs-up-down-outline-rounded",
        title: "Jurado de expertos",
        description: "Un panel de jueces profesionales en la industria evaluara las habilidades de los participantes.",
    },
    {
        icon: "featured-seasonal-and-gifts-rounded",
        title: "Premios, sorteos y reconocimiento",
        description: "Atractivos premios para los ganadores y prestigio de ser reconocidos como los mejores del país.",
    },
    {
        icon: "local-bar-outline-rounded",
        title: "Cierre con cocktail y refrigerios",
        description: "Al finalizar podrán disfrutar de una selección de bebidas y aperitivos, para relajarse y socializar.",
    },
]
</script>