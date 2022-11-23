import { defineNuxtPlugin } from '#app'
import VueEasyLightbox from "vue-easy-lightbox";

export default defineNuxtPlugin((nuxtApp) => {

  nuxtApp.vueApp.use(VueEasyLightbox)
})


