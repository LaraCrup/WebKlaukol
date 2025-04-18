<template>
    <DefaultSection>
        <DefaultContent>
            <NuxtImg src="/images/home/acerca/Acerca-Evento-Klaukol-Mobile.png" alt="Acerca del Evento Klaukol"
                class="w-full object-cover" />
            <div class="flex flex-col gap-6 p-4">
                <div class="flex flex-col gap-1">
                    <p class="font-medium">ACERCA DEL EVENTO</p>
                    <DefaultH2 class="text-primary">EN BUSCA DEL COLOCADOR KLAUKOL</DefaultH2>
                </div>
                <div class="flex flex-col gap-3">
                    <div v-for="(actividad, index) in actividades" :key="index" class="flex flex-col gap-2">
                        <Icon :name="`material-symbols:${actividad.icon}`" class="w-9 h-9 text-primary" />
                        <div>
                            <p class="font-semibold text-sm">{{ actividad.title }}</p>
                            <p class="text-xs">{{ actividad.description }}</p>
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