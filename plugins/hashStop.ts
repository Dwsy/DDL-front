import {
  abortNavigation,
  addRouteMiddleware,
  defineNuxtPlugin,
  navigateTo,
} from "#app";
import { el } from "vuetify/locale";

export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    "hashStop-middleware",
    (to, from) => {
      // if (to.hash) {
      //
      //     if (to.fullPath===from.fullPath){
      //         const el = document.querySelector(to.hash)
      //         if (el) {
      //             el.scrollIntoView()
      //         }
      //         return false
      //     }else {
      //         return abortNavigation("It's not an error, it's a feature")
      //         // return abortNavigation()
      //     }
      // }
    },
    { global: true }
  );
});
