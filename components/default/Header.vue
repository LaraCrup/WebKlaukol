<template>
    <header class="bg-primary py-5 px-4 mb-[2px]">
        <DefaultContent class="flex !flex-row justify-between items-center">
            <div class="flex items-center gap-2">
                <NuxtImg src="/images/Logo-Sika.svg" alt="Logo Sika" class="h-6" />
                <NuxtImg src="/images/Logo-Klaukol.svg" alt="Logo Klaukol" class="h-6" />
            </div>
            <div class="flex items-center gap-2">
                <NuxtLink v-for="(social, index) in socialMedia" :key="index" :to="social.url" target="_blank"
                    class="text-white hover:text-gray-300 transition-colors">
                    <NuxtImg :src="`/images/social/${social.name}-Logo.svg`" :alt="social.name" class="h-6" />
                </NuxtLink>
            </div>
        </DefaultContent>
    </header>
</template>

<script setup>
const socialMedia = [
    {
        name: 'Facebook',
        url: '#'
    },
    {
        name: 'Instagram',
        url: '#'
    },
    {
        name: 'YouTube',
        icon: 'material-symbols:youtube',
        url: '#'
    },
]
</script>