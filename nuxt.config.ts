import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  $production: {
    routeRules: {
      "/**": { isr: true },
    },
  },

  modules: [
    "nuxt-primevue"
  ],

  srcDir: "./src",

  $development: {
    //
  },
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    "primeicons/primeicons.css",
    "primevue/resources/themes/aura-light-green/theme.css",
    "~/assets/css/main.css",
    "~/assets/index.scss",
  ],

  vite: {
    build: {
      sourcemap: false
    },
    clearScreen: true,
    logLevel: 'info' 
  }
});
