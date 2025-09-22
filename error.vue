<template>
    <DefaultSection class="min-h-screen flex items-center justify-center bg-lightGray">
        <DefaultContent class="text-center gap-8 p-4 md:p-8">
            <div class="flex flex-col gap-6">
                <!-- Número de error o icono para 404 -->
                <div class="flex flex-col items-center gap-4">
                    <div v-if="error.statusCode === 404" class="flex flex-col items-center gap-4">
                        <Icon name="material-symbols:error-circle-rounded-outline-sharp" size="8rem" class="text-primary" />
                        <div class="w-24 h-1 bg-primary rounded-full"></div>
                    </div>
                    <div v-else class="flex flex-col items-center gap-4">
                        <h1 class="text-8xl md:text-9xl xl:text-[12rem] font-bold text-primary">
                            {{ error.statusCode }}
                        </h1>
                        <div class="w-24 h-1 bg-primary rounded-full"></div>
                    </div>
                </div>

                <!-- Mensaje de error -->
                <div class="flex flex-col gap-3">
                    <DefaultH2 class="text-gray">
                        {{ getErrorTitle() }}
                    </DefaultH2>
                    <p class="text-sm md:text-base xl:text-xl text-gray max-w-lg mx-auto">
                        {{ getErrorMessage() }}
                    </p>
                </div>

                <!-- Botón de acción -->
                <div class="flex justify-center items-center mt-8">
                    <button 
                        @click="handleError" 
                        class="bg-primary hover:bg-primaryHover text-white font-semibold px-6 py-3 rounded-[9px] transition-all duration-300 text-sm md:text-base xl:text-xl"
                    >
                        Volver al inicio
                    </button>
                </div>

                <!-- Información adicional -->
                <div class="mt-8 p-4 bg-white rounded-[1.125rem] shadow-1 max-w-md mx-auto">
                    <div class="flex items-center gap-2 mb-3">
                        <Icon v-if="error.statusCode === 404" name="material-symbols:lightbulb-outline" size="1.5rem" class="text-primary" />
                        <Icon v-else name="material-symbols:info-outline" size="1.5rem" class="text-primary" />
                        <p class="font-semibold text-sm md:text-base text-gray">
                            {{ error.statusCode === 404 ? 'Sugerencias' : '¿Necesitas ayuda?' }}
                        </p>
                    </div>
                    <div v-if="error.statusCode === 404" class="text-xs md:text-sm text-gray text-left">
                        <ul class="space-y-1">
                            <li>• Verifica que la URL esté escrita correctamente</li>
                            <li>• Regresa al inicio y navega desde allí</li>
                            <li>• Contacta con nosotros si el problema persiste</li>
                        </ul>
                    </div>
                    <p v-else class="text-xs md:text-sm text-gray text-left">
                        Si el problema persiste, puedes contactarnos a través de nuestras redes sociales 
                        o intentar nuevamente más tarde.
                    </p>
                </div>
            </div>
        </DefaultContent>
    </DefaultSection>
</template>

<script setup>
// Definir las props que Nuxt pasa automáticamente
const props = defineProps({
    error: Object
});

// Función para obtener el título del error
const getErrorTitle = () => {
    switch (props.error?.statusCode) {
        case 404:
            return 'Página no encontrada';
        case 500:
            return 'Error interno del servidor';
        case 403:
            return 'Acceso denegado';
        case 401:
            return 'No autorizado';
        default:
            return 'Algo salió mal';
    }
};

// Función para obtener el mensaje del error
const getErrorMessage = () => {
    switch (props.error?.statusCode) {
        case 404:
            return 'La página que estás buscando no existe o ha sido movida a otra ubicación.';
        case 500:
            return 'Estamos experimentando problemas técnicos. Por favor, intenta nuevamente más tarde.';
        case 403:
            return 'No tienes permisos para acceder a esta página.';
        case 401:
            return 'Necesitas iniciar sesión para acceder a esta página.';
        default:
            return 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.';
    }
};

// Función para manejar el error (ir al inicio)
const handleError = async () => {
    await clearError({ redirect: '/' });
};

// Meta tags para SEO
useHead({
    title: `Error ${props.error?.statusCode || ''}`,
    meta: [
        {
            name: 'robots',
            content: 'noindex, nofollow'
        }
    ]
});
</script>
