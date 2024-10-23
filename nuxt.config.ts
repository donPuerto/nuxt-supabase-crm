// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true, componentInspector: false },
  ssr: false,
  routeRules: {
  
  },
  modules: [
    'radix-vue/nuxt',
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxtjs/supabase',
    '@nuxt/eslint',
    '@vee-validate/nuxt',
    '@morev/vue-transitions/nuxt',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [],
  plugins: [

  ],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: true,
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/callback',
    },
    cookieOptions: {
      maxAge: 3600, // 1 hour in seconds
      sameSite: 'lax',
      secure: true,
    },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  tailwindcss: {
    exposeConfig: true,
  },

  colorMode: {
    classSuffix: '',
  },

  imports: {
    imports: [{
      from: 'tailwind-variants',
      name: 'tv',
    }, {
      from: 'tailwind-variants',
      name: 'VariantProps',
      type: true,
    }],
  },
 
});
