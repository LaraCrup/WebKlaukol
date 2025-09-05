<template>
    <header class="bg-primary py-5 px-4 md:py-[1.125rem] md:px-8 xl:px-16 mb-[2px]">
        <DefaultContent class="flex !flex-row justify-between items-center">
            <div class="flex items-center gap-2 md:gap-6">
                <NuxtImg src="/images/Logo-Sika.svg" alt="Logo Sika" class="h-6 md:h-16" />
                <NuxtImg src="/images/Logo-Klaukol.svg" alt="Logo Klaukol" class="h-6 md:h-12" />
            </div>
            <div class="flex items-center gap-2 md:gap-3">
                <NuxtLink v-for="(social, index) in socialMedia" :key="index" :to="social.url" target="_blank"
                    rel="noopener noreferrer" class="text-white hover:text-gray-300 transition-colors">
                    <NuxtImg :src="`/images/social/${social.name}-Logo.svg`" :alt="social.name" class="h-6 md:h-9" />
                </NuxtLink>
            </div>
        </DefaultContent>
    </header>
</template>

<script setup>
const socialMedia = [
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/KlaukolOficial'
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/klaukoloficial/'
    },
]
</script>