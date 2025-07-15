// https://nuxt.com/docs/api/configuration/nuxt-config
import {fileURLToPath} from "node:url";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src/', // resource
  runtimeConfig:{
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  nitro: {
    routeRules: {
      '/auth/**': { proxy: process.env.NUXT_PUBLIC_API_BASE + "/auth/" }
    }
  },
  alias:{
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    '~': fileURLToPath(new URL('./src', import.meta.url))
  },
  modules:['@nuxtjs/i18n',
    ['@element-plus/nuxt',{importStyle: 'css', themes: ['dark']}],
    '@pinia/nuxt','pinia-plugin-persistedstate/nuxt'],
  plugins: ['@/plugins/async-validator.client'],
  i18n:{
    strategy: 'no_prefix', // no prefix router
    detectBrowserLanguage: {
        useCookie: true,     // use cookie to store language
        cookieKey: 'i18n_redirected'
    },
    locales: [
      { code: 'zh_CN', iso: 'zh-CN', file: 'zh-CN.js' },
      { code: 'en_US', iso: 'en-US', file: 'en-US.js' }
    ],
    lazy: true,
    langDir: 'locales',
  },


  // typescript: {
  //   tsConfig: {
  //     extends: './tsconfig.json'
  //   }
  // }
})