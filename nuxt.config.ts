console.log(process.env.BASE_URL)
import {defineNuxtConfig} from 'nuxt/config'

export default defineNuxtConfig({
    app: {
        head: {
            meta: [],
            noscript: [],
            style: [],
            charset: 'utf-8',
            // title: 'DDL',
            viewport: 'width=device-width, initial-scale=1',
            script: [
                {src: 'https://cdn.bootcdn.net/ajax/libs/tocbot/4.18.2/tocbot.js'},
                {src: 'https://cdn.bootcdn.net/ajax/libs/mermaid/9.1.7/mermaid.js'},
            ],
            link: [
                {rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/tocbot/4.18.2/tocbot.css'}
            ],
        },
        // keepalive:true
    },

    vite: {
        logLevel: 'info',
        optimizeDeps: {
            include: ['vue', 'pinia'],
        },
        define: {
            'process.env.DEBUG': 'false',
        },
        server: {
            hmr: {
                overlay: true
            }
        }
    },
    css: ['vuetify/lib/styles/main.sass'],
    modules: [
        [
            '@pinia/nuxt',
            // {
            //     addImports: [
            //         'defineStore',
            //         ['defineStore', 'definePiniaStore'],
            //     ],
            // },

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
    // publicRuntimeConfig: {
    //     axios: {
    //         baseURL:
    //             process.env.NODE_ENV === process.env.BASE_URL
    //     },
    //     app: {
    //         baseURL: process.env.BASE_URL
    //     }
    // },
    runtimeConfig: {
        // Private keys are only available on the server
        apiSecret: '123',
        // Public keys that are exposed to the client
        public: {
            baseURL: process.env.NUXT_PUBLIC_API_BASE_URL
        }
    },
    typescript: {
        strict: false
    },
    build: {
        // postcss: {
        //     postcssOptions: {
        //         plugins: {
        //             autoprefixer: {},
        //         },
        //     },
        // },
        transpile: ['vuetify', 'vue-toastification'],
    },
})
