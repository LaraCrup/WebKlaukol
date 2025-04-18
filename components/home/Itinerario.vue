<template>
    <DefaultSection class="bg-lightGray p-4 md:p-8">
        <DefaultContent class="gap-6">
            <div class="flex flex-col gap-1">
                <DefaultSubtitle class="text-center text-primary">ACERCA DEL EVENTO</DefaultSubtitle>
                <DefaultH2 class="text-center">ITINERARIO DEL EVENTO</DefaultH2>
            </div>
            <div class="flex flex-wrap justify-center gap-4">
                <div v-for="(evento, index) in eventos" :key="index" class="w-full max-w-[290px] shadow-1 rounded-[18px]">
                    <div class="flex items-center gap-1 bg-primary rounded-t-[18px] text-white font-semibold py-3 px-4">
                        <p class="text-sm">{{ evento.nombre_provincia }}</p>
                        <span>-</span>
                        <p class="text-sm">{{ evento.nombre_ciudad }}</p>
                    </div>
                    <div class="h-[102px] flex flex-col justify-between jus gap-3 py-3 px-4">
                        <p class="text-xs">{{ evento.direccion }}</p>
                        <div class="flex items-center gap-3">
                            <div class="flex items-center gap-1">
                                <Icon name="material-symbols:calendar-month-outline" size="1.5rem" class="text-primary" />
                                <p class="text-xs">{{ evento.fecha }}</p>
                            </div>
                            <div class="flex items-center gap-1">
                                <Icon name="material-symbols:nest-clock-farsight-analog-outline" size="1.5rem" class="text-primary" />
                                <p class="text-xs">{{ evento.horario }}</p>
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
        nombre_provincia: "SANTA FÉ",
        nombre_ciudad: "ROSARIO",
        direccion: "Metropolitano Centro de eventos y convenciones Rosario, Prov. de Santa Fé.",
        fecha: "13 de Septiembre",
        horario: "18:30"
    },
    {
        nombre_provincia: "CÓRDOBA",
        nombre_ciudad: "VILLA MARÍA",
        direccion: "Salón Asociación Española.",
        fecha: "20 de Septiembre",
        horario: "18:30"
    },
    {
        nombre_provincia: "BUENOS AIRES",
        nombre_ciudad: "ADROGUÉ",
        direccion: "Polideportivo Municipal de Almirante Brown (calle 25 de mayo).",
        fecha: "27 de Septiembre",
        horario: "18:30"
    },
    {
        nombre_provincia: "MENDOZA",
        nombre_ciudad: "MENDOZA CAPITAL",
        direccion: "Salón Agne Rayén (Araujo 3850, Bermejo, Guaymallen).",
        fecha: "4 de Octubre",
        horario: "18:30"
    },
    {
        nombre_provincia: "CHACO",
        nombre_ciudad: "CHACO CAPITAL",
        direccion: "Club Juventud Villa Centenario (Av. San Martin 1050, Resistencia Chaco).",
        fecha: "11 de Octubre",
        horario: "18:30"
    },
    {
        nombre_provincia: "BUENOS AIRES",
        nombre_ciudad: "C.A.B.A",
        direccion: "Hotel Torre Pueblo.",
        fecha: "18 de Octubre",
        horario: "18:30"
    },
];
</script>