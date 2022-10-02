import {defineNuxtPlugin} from '#app'
import {ref} from 'vue'
import {useLayout} from '~/stores/layout'

export default defineNuxtPlugin((nuxtApp) => {
  const bar = ref(null)
  const layout = useLayout()
  // nuxtApp.hook("app:mounted", (e) => {
  //   if (!bar.value) {
  //     const { loadingBar } = createDiscreteApi(["loadingBar"]);
  //     bar.value = loadingBar;
  //   }
  // });
  nuxtApp.hook('page:start', (e) => {
    layout.loading = true
  })
  nuxtApp.hook('page:finish', (e) => {
    setTimeout(() => layout.loading = false, 300)
  })
  nuxtApp.hook('app:error', (e) => {
    //判断是否在客户端
    if (process.client) {
      setTimeout(() => layout.loading = false, 300)
    }
  })
})
