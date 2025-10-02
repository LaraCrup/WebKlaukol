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
    '@pinia/nuxt',
  ],
  
  // Configuraciones de seguridad
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
          'X-XSS-Protection': '1; mode=block',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';"
        }
      },
      // Block suspicious paths
      '/info/**': { prerender: false, index: false, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } },
      '/admin/**': { prerender: false, index: false, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } },
      '/wp-admin/**': { prerender: false, index: false, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } },
      '/wp-content/**': { prerender: false, index: false, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } },
      '/wordpress/**': { prerender: false, index: false, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } },
      '/.env': { prerender: false, index: false, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } },
      '/.git/**': { prerender: false, index: false, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
    }
  },
  
  supabase: {
    redirect: false,
  },
  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700, 800],
    }
  },
  icon: {
    size: '1rem',
    serverBundle: {
      collections: ['material-symbols'],
    }
  },
  
  // SEO Configuration
  app: {
    head: {
      meta: [
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      ]
    }
  },
  


  // App
  site: {
    url: 'https://en-busca-del-colocador-klaukol.com.ar/',
    name: 'Klaukol',
    description: 'Klaukol',
    defaultLocale: 'es',
    indexable: true,
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