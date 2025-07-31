<template>
    <DefaultSection class="bg-lightGray p-4 md:p-8 xl:p-16">
        <DefaultContent class="gap-6 xl:gap-8">
            <div class="flex flex-col gap-1">
                <DefaultSubtitle class="text-center text-primary">UBICACIÓN Y HORARIO</DefaultSubtitle>
                <DefaultH2 class="text-center">ITINERARIO DEL EVENTO</DefaultH2>
            </div>
            <div class="flex flex-wrap justify-center gap-4">
                <div v-for="(evento, index) in eventos" :key="index" class="w-full max-w-[290px] xl:max-w-[306px] 2xl:max-w-[399px] shadow-1 rounded-[1.125rem]">
                    <div class="flex items-center gap-1 bg-primary rounded-t-[1.125rem] text-white font-semibold py-3 px-4">
                        <p class="text-sm xl:text-base 2xl:text-xl">{{ evento.nombre_provincia }}</p>
                        <span>-</span>
                        <p class="text-sm xl:text-base 2xl:text-xl">{{ evento.nombre_ciudad }}</p>
                    </div>
                    <div class="h-[102px] xl:h-[108px] flex flex-col justify-between jus gap-3 py-3 px-4">
                        <p class="text-xs xl:text-sm 2xl:text-base">{{ evento.direccion }}</p>
                        <div class="flex items-center gap-3">
                            <div class="flex items-center gap-1">
                                <Icon name="material-symbols:calendar-month-outline" size="1.5rem" class="text-primary" />
                                <p class="text-xs xl:text-sm 2xl:text-base">{{ evento.fecha }}</p>
                            </div>
                            <div class="flex items-center gap-1">
                                <Icon name="material-symbols:nest-clock-farsight-analog-outline" size="1.5rem" class="text-primary" />
                                <p class="text-xs xl:text-sm 2xl:text-base">{{ evento.horario }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <HomeLocationMap :eventos="eventos" /> -->
        </DefaultContent>
    </DefaultSection>
</template>

<script setup>
const eventos = [
    {
        nombre_provincia: "MISIONES",
        nombre_ciudad: "POSADAS",
        direccion: "ZZZZZZZZZZZZZZZZZZZ",
        fecha: "23 de Septiembre",
        horario: "ZZ:ZZ"
    },
    {
        nombre_provincia: "CORRIENTES",
        nombre_ciudad: "ZZZZZZ",
        direccion: "ZZZZZZZZZZZZZZZZZZ",
        fecha: "25 de Septiembre",
        horario: "ZZ:ZZ"
    },
    {
        nombre_provincia: "BUENOS AIRES",
        nombre_ciudad: "BAHÍA BLANCA",
        direccion: "ZZZZZZZZZZZZZZ.",
        fecha: "16 de Octubre",
        horario: "ZZ:ZZ"
    },
];
</script>