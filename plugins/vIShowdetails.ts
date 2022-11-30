
import { defineNuxtPlugin } from '#app'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('iShowDetails', {
    mounted(el, binding) {
      clog(el);
      const detailsNode: HTMLElement = el.querySelector('.d-i-comment-details')
      el.addEventListener('mouseleave', () => {
        if (detailsNode.style.display === 'inline') {
          setTimeout(() => {
            detailsNode.style.display = 'none'
          }, 1500)
        } else {
          detailsNode.style.display = 'none'
        }
      })
      el.addEventListener('mouseover', () => {
        detailsNode.style.display = 'inline'
      })
    },
  })
})