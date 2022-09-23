import {addRouteMiddleware, defineNuxtPlugin} from '#app'

export default defineNuxtPlugin(() => {
    addRouteMiddleware('hashStop-middleware', (to, from) => {

            if (to.hash) {
                const el = document.querySelector(to.hash)
                if (el) {
                    el.scrollIntoView()
                }
                return false
            }
        },
        {global: true}
    )
})