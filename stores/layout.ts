import {ref, Ref} from 'vue'
import {defineStore} from 'pinia'
import {ThemeInstance} from 'vuetify'
import {CountType, useAxiosGetUnreadMessageCount} from '~/composables/Api/messages'
import {warningMsg} from '~/composables/utils/toastification'

interface layout {
    drawer: Ref<boolean>,
    themeName: Ref<string>,
    showFooter: boolean,
    loading: boolean,
    unReadNotifyCount
}

// const theme = useTheme()
export const useLayout = defineStore('layout', {
    state: (): layout => ({
        drawer: ref<boolean>(false),
        themeName: ref(''),
        showFooter: false,
        loading: true,
        unReadNotifyCount: 0
    }),
    getters: {
        getThemeName() {
            return this.themeName
        }
    },
    actions: {
        switchDrawer() {
            this.drawer = !this.drawer
            console.log(this.drawer)
        },
        switchTheme(theme: ThemeInstance) {
            // console.log("theme:",theme.global.name.value)
            theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
            document.cookie = `theme=${theme.global.name.value};path=/`
        },
        switchLightTheme(theme: ThemeInstance) {
            theme.global.name.value = 'light'

            // document.cookie = `theme=${theme.global.name.value};path=/;max-age=31536000`
        },
        switchDarkTheme(theme: ThemeInstance) {
            theme.global.name.value = 'dark'

            // document.cookie = `theme=${theme.global.name.value};path=/;max-age=31536000`
        },
        async getUnreadCount() {
            const response = await useAxiosGetUnreadMessageCount(CountType.All)
            if (response == null) {
                return
            }
            if (response.data.code == 0) {
                this.unReadNotifyCount = response.data.data.unreadNotifyCount
            } else {
                console.log(response.data.msg)
            }
        }
        // setThemeDark(){
        //     theme.global.name.value="dark"
        // },
        // setThemeLight(){
        //     theme.global.name.value="light"
        // },
        // switchTheme(){
        // }
    },

})
