import { defineNuxtPlugin } from "#app";
import VueToastificationPlugin from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import { useToast as useToastOriginal } from "vue-toastification";
import { PluginOptions } from "vue-toastification/src/types";
import { POSITION } from "vue-toastification/src/ts/constants";

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    transition: "Vue-Toastification__fade",
    maxToasts: 10,
    newestOnTop: true,
    position: POSITION.TOP_RIGHT,
    shareAppContext: true,
  };
  // fixme 会报[Vue warn]: A plugin must either be a function or an object with an "install" function.
  //    但是可以用
  nuxtApp.vueApp.use(VueToastificationPlugin, options);
});

export const useToast = (): ReturnType<typeof useToastOriginal> => {
  return useToastOriginal();
};
