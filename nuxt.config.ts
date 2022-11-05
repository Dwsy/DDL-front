console.log(process.env.BASE_URL)
import {domToCodePlugin} from 'dom-to-code/vite'

export default defineNuxtConfig({
    app: {
        head: {
            meta: [],
            noscript: [],
            style: [],
            charset: 'utf-8',
            title: 'DDL',
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
        // logLevel: "info",
        optimizeDeps: {
            include: ['vue', 'pinia'],
        },
        define: {
            'process.env.DEBUG': 'false',
        },
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
    // supabase: {},
    publicRuntimeConfig: {
        axios: {
            baseURL:
                process.env.NODE_ENV === process.env.BASE_URL
        },
        app: {
            baseURL: process.env.BASE_URL
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
