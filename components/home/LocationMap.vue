<template>
    <div class="relative w-full h-[450px] rounded-lg overflow-hidden shadow-md">
        <iframe :src="currentMapUrl" class="w-full h-full border-0" loading="lazy" referrerpolicy="no-referrer"
            allow="fullscreen">
        </iframe>

        <div class="flex gap-2 absolute bottom-0 left-0 right-0 z-10 overflow-x-scroll p-4">
            <button v-for="(evento, index) in eventos" :key="index" :class="[
                'border-none rounded-[9px] text-sm font-semibold transition-all duration-300 cursor-pointer py-[8.5px] px-9',
                selectedEventoIndex === index ? 'bg-primary text-white' : 'bg-white text-primary'
            ]" @click="selectEvento(index)">
                {{ evento.nombre_ciudad }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props: esperamos recibir el array de eventos
const props = defineProps({
    eventos: {
        type: Array,
        required: true
    }
})

// Estado para el evento seleccionado
const selectedEventoIndex = ref(0)

// Evento actual basado en el índice seleccionado
const currentEvento = computed(() => {
    return props.eventos[selectedEventoIndex.value] || null
})

// URLs pregeneradas para cada ubicación
// Estas URLs las debes obtener manualmente desde Google Maps para cada ubicación
const mapUrls = [
    // Rosario
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107140.87318811822!2d-60.752453499999996!3d-32.95444975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6539335d7d75b%3A0xec4086e90e7ed8c3!2sRosario%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1718748906831!5m2!1ses-419!2sar",
    // Villa María
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54076.77559107538!2d-63.29069465!3d-32.40762735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cc42fb51306dc1%3A0xbfb3fffbd425c6a1!2sVilla%20Mar%C3%ADa%2C%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1718748984598!5m2!1ses-419!2sar",
    // Adrogué
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26239.65905544236!2d-58.42023285!3d-34.79964605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd2dc8585ad6f%3A0xd8f4d7432149ccbe!2sAdrogu%C3%A9%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1718749019639!5m2!1ses-419!2sar",
    // Mendoza Capital
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107152.32201866835!2d-68.93550675!3d-32.88959195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e093ec45179bf%3A0x205a78f6d20efa3a!2sMendoza!5e0!3m2!1ses-419!2sar!4v1718749063087!5m2!1ses-419!2sar",
    // Chaco Capital
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113927.11060182651!2d-59.06034175!3d-27.446284500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94450c7dfb8419b5%3A0x68ef660420a17081!2sResistencia%2C%20Chaco!5e0!3m2!1ses-419!2sar!4v1718749092542!5m2!1ses-419!2sar",
    // C.A.B.A
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.44367018693!2d-58.503338949999995!3d-34.61566245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20CABA!5e0!3m2!1ses-419!2sar!4v1718749123262!5m2!1ses-419!2sar"
]

// URL del mapa basado en el evento seleccionado
const currentMapUrl = computed(() => {
    return mapUrls[selectedEventoIndex.value] || mapUrls[0]
})

// Función para seleccionar un evento
const selectEvento = (index) => {
    if (index >= 0 && index < props.eventos.length) {
        selectedEventoIndex.value = index
    }
}
</script>