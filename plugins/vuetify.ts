import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.min.css'
import {defineNuxtPlugin} from '#app'
export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
      components,
      directives,
      ssr: true

  })

  nuxtApp.vueApp.use(vuetify)
})
