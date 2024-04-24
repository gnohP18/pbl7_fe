import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  $production: {
    routeRules: {
      "/**": { isr: true },
    },
  },

  modules: [
    '@pinia/nuxt',
    "nuxt-primevue"
  ],

  dir: {
    public: '../public/'
  },

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

  primevue: {
    cssLayerOrder: 'reset,primevue'
  },

  vite: {
    build: {
      sourcemap: false
    },
    clearScreen: true,
    logLevel: 'info' 
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: `${process.env.API_BASE_URL}/`,
    }
  }
});
