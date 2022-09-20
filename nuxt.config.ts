
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
    // css: ["~/assets/css/tailwind.css"],
    // css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.css'],
    css: ['vuetify/lib/styles/main.sass'],
    modules: [
        [
            '@pinia/nuxt',
            {
                addImports: [
                    'defineStore',
                    ['defineStore', 'definePiniaStore'],
                ],
            },
            
        ],
        '@vueuse/nuxt',
    ],
    imports: {
        dirs: [
          'composables',
          'composables/*/index.{ts,js,mjs,mts}',
          'composables/**'
        ]
      },
    supabase: {},
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
        // postcss: {
        //     postcssOptions: {
        //         plugins: {
        //             autoprefixer: {},
        //         },
        //     },
        // },
        transpile: ["vuetify"],
    },
})
