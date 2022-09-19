
console.log(process.env.BASE_URL);

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
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],
    //   buildModules: ["@pinia/nuxt"],
    modules: [
        // '@nuxtjs/tailwindcss',
        [
            '@pinia/nuxt',
            {
                addImports: [
                    // automatically imports `usePinia()`
                    'defineStore',
                    // automatically imports `usePinia()` as `usePiniaStore()`
                    ['defineStore', 'definePiniaStore'],
                ],
            },
        ],
        // "@nuxtjs/supabase",
        // ['@nuxtjs/axios',{proxyHeaders:false}]
    ],
    imports: {
        dirs: [
          // Scan top-level modules
          'composables',
          // ... or scan modules nested one level deep with a specific name and file extension
          'composables/*/index.{ts,js,mjs,mts}',
          // ... or scan all modules within given directory
          'composables/**'
        ]
      },
    supabase: {},
    // build modules
    // buildModules: [
    //     // '@nuxtjs/composition-api/module',
    //     '@pinia/nuxt'
    //
    //     // "@vueuse/nuxt",
    //     // "@nuxtjs/axios",
    // ],
    publicRuntimeConfig: {
        axios: {
            baseURL:
                process.env.NODE_ENV === process.env.BASE_URL
        },
        app: {
            baseURL: process.env.BASE_URL
        }
    },
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
