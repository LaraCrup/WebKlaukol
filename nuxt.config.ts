// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/seo',
    'nuxt-vitalizer',
    'nuxt-booster',
    '@nuxtjs/fontaine',
    '@nuxt/scripts',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
  ],
  supabase: {
    redirect: false,
  },
  // Fonts
  // Icon
  // App
  site: {
    url: 'https://en-busca-del-colocador-klaukol.com.ar/',
    name: 'Klaukol',
    description: 'Klaukol',
    defaultLocale: 'es',
  },
  booster: {
    detection: {
      performance: true,
      browserSupport: true,
      battery: true
    },
    performanceMetrics: {
      timing: {
        fcp: 800,
        dcl: 1200
      }
    },
    lazyOffset: {
      component: '0%',
      asset: '0%'
    }
  },
  image: {
    screens: {
      default: 320,
      xxs: 480,
      xs: 576,
      sm: 768,
      md: 996,
      lg: 1200,
      xl: 1367,
      xxl: 1600,
      '4k': 1921
    },
    domains: ['img.youtube.com', 'i.vimeocdn.com'],
    alias: {
      youtube: 'https://img.youtube.com',
      vimeo: 'https://i.vimeocdn.com',
    }
  },
  vitalizer: {
    disableStylesheets: 'entry',
    disablePrefetchLinks: true
  },
})