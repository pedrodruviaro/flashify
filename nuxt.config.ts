// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@formkit/auto-animate/nuxt"],
  colorMode: {
    preference: "light",
    fallback: "light",
    storageKey: "flashify-color-mode",
  },
  runtimeConfig: {
    public: {
      nodeEnv: process.env.NODE_ENV,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      siteUrl: process.env.SITE_URL,
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/login/redirect",
      exclude: ["/"],
    },
  },
})
