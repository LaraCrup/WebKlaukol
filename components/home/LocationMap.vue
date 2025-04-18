<template>
    <div class="relative w-full h-[450px] rounded-xl overflow-hidden shadow-md">
        <div ref="mapContainer" class="w-full h-full"></div>

        <div class="flex gap-2 absolute bottom-0 left-0 right-0 z-10 overflow-x-scroll p-4">
            <button v-for="(evento, index) in eventos" :key="index" :class="[
                'border-none rounded-[9px] text-sm font-semibold transition-all duration-300 cursor-pointer py-[8.5px] px-9',
                selectedEventoIndex === index ? 'bg-primary text-white' : 'bg-white text-primary'
            ]" @click="selectEvento(index)">
                {{ evento.nombre_ciudad }}
            </button>
        </div>

        <div v-if="mapError" class="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div class="text-center p-4">
                <p class="text-xl text-gray-700 mb-2">No se pudo cargar el mapa</p>
                <p class="text-sm text-gray-500">Por favor, intente más tarde</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const GOOGLE_MAPS_API_KEY = process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY

const props = defineProps({
    eventos: {
        type: Array,
        required: true
    }
})

const mapContainer = ref(null)
let map = null
let markers = []
const mapError = ref(false)

const selectedEventoIndex = ref(0)

const currentEvento = computed(() => {
    return props.eventos[selectedEventoIndex.value] || null
})

const coordenadas = [
    { lat: -32.9442, lng: -60.6505 }, // Rosario
    { lat: -32.4077, lng: -63.2481 }, // Villa Maria 
    { lat: -34.7987, lng: -58.3939 }, // Adrogué
    { lat: -32.8894, lng: -68.8458 }, // Mendoza
    { lat: -27.4513, lng: -58.9863 }, // Resistencia (Chaco)
    { lat: -34.6037, lng: -58.3816 }  // CABA
]

const loadGoogleMapsApi = () => {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            return resolve(window.google.maps)
        }

        // Creamos un script con async
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=weekly`
        script.async = true

        script.onload = () => resolve(window.google.maps)
        script.onerror = (error) => {
            console.error('Error al cargar Google Maps:', error)
            mapError.value = true
            reject(error)
        }

        document.head.appendChild(script)
    })
}

const initMap = async () => {
    try {
        const googleMaps = await loadGoogleMapsApi()

        // Crear mapa
        map = new googleMaps.Map(mapContainer.value, {
            center: coordenadas[selectedEventoIndex.value],
            zoom: 15,
            mapTypeControl: false,
            fullscreenControl: true,
            streetViewControl: true,
            zoomControl: true,
        })

        createMarkers(googleMaps)

        updateMapView()

    } catch (error) {
        console.error('Error al inicializar el mapa:', error)
        mapError.value = true
    }
}

const createMarkers = (googleMaps) => {
    markers.forEach(marker => marker.setMap(null))
    markers = []

    props.eventos.forEach((evento, index) => {
        if (coordenadas[index]) {
            const marker = new googleMaps.Marker({
                position: coordenadas[index],
                map: null, // Inicialmente no visible
                title: evento.nombre_ciudad,
                animation: googleMaps.Animation.DROP
            })

            markers.push(marker)
        }
    })
}

const updateMapView = () => {
    if (!map || markers.length === 0) return

    markers.forEach(marker => marker.setMap(null))

    if (markers[selectedEventoIndex.value]) {
        markers[selectedEventoIndex.value].setMap(map)

        map.setCenter(coordenadas[selectedEventoIndex.value])

        map.setZoom(15)
    }
}

const selectEvento = (index) => {
    if (index >= 0 && index < props.eventos.length) {
        selectedEventoIndex.value = index
    }
}

watch(selectedEventoIndex, () => {
    updateMapView()
})

const handleResize = () => {
    if (map) {
        map.setCenter(coordenadas[selectedEventoIndex.value])
    }
}

onMounted(() => {
    initMap()
    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    if (markers.length) {
        markers.forEach(marker => marker.setMap(null))
        markers = []
    }
    map = null
    window.removeEventListener('resize', handleResize)
})
</script>