import { ref, Ref } from "vue";
import { defineStore } from "pinia";
import { useTheme } from 'vuetify'
import {th} from "vuetify/locale";
interface layout{
    drawer:Ref<boolean>,
    themeName:string
}
// const theme = useTheme()
export const useLayout = defineStore("layout", {
    state: (): layout => ({
        drawer: ref<boolean>(true),
        themeName:"dark"
    }),
    actions: {
        switchDrawer() {
            this.drawer = !this.drawer;
            console.log(this.drawer)
        },
        // setThemeDark(){
        //     theme.global.name.value="dark"
        // },
        // setThemeLight(){
        //     theme.global.name.value="light"
        // },
        // switchTheme(){
        // }
    },
});
