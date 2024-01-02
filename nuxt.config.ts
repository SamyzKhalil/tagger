// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    typedPages: true,
  },
  vite: {
    plugins: [],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    // 'shadcn-nuxt',
    '@vueuse/nuxt',
    '@formkit/auto-animate/nuxt',
    'nuxt-icon',
    '@nuxtjs/supabase',
  ],
  supabase: {
    redirectOptions: {
      login: '/login',
      exclude: ['/register'],
      callback: '/confirm',
    },
  },
})
