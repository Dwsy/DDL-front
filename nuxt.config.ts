import { defineNuxtConfig } from 'nuxt'
// import axios from 'axios'
// import type { AxiosInstance, AxiosRequestConfig } from 'axios'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    meta: {},
    intlify: {
        localeDir: "locales",
        vueI18n: {},
    },
    vite: {
        // logLevel: "info",
        optimizeDeps: {
            include: ["vue", "pinia"],
        },
        define: {
            "process.env.DEBUG": "false",
        },
    },
    // postcss: {
    //     plugins: {
    //         tailwindcss: {},
    //     },
    // },
    // css: ["~/assets/css/tailwind.css"],
    css: ['vuetify/lib/styles/main.sass', 'mdi/css/materialdesignicons.min.css'],
    //   buildModules: ["@pinia/nuxt"],
    modules: [
        // '@nuxtjs/tailwindcss',
        "@pinia/nuxt",
        // "@nuxtjs/supabase",
        // ['@nuxtjs/axios',{proxyHeaders:false}]
    ],
    supabase: {},
    // build modules
    buildModules: [
        // '@nuxtjs/composition-api/module',
        '@pinia/nuxt'

        // "@vueuse/nuxt",
        // "@nuxtjs/axios",
    ],
    // publicRuntimeConfig: {
    //     axios: {
    //         baseURL:
    //             process.env.NODE_ENV === "production"
    //                 ? "/api"
    //                 : "http://localhost:7000/api",
    //     },
    // },
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    // tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
        transpile: ["vuetify"],
        // transpile:
        //     process.env.NODE_ENV === 'production'
        //         ? [
        //             // 'naive-ui',
        //             'vueuc',
        //             '@css-render/vue3-ssr',
        //             '@juggle/resize-observer'
        //         ]
        //         : ['@juggle/resize-observer']
    },

    // modules: [
    //     // https://go.nuxtjs.dev/typescript
    //     '@nuxt/typescript-build',

    //     // @nuxtjs/composition-api
    //     '@nuxtjs/composition-api/module'
    // ],
})
