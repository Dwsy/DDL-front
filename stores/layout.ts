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
        drawer: ref<boolean>(true),
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
            document.cookie = `theme=${theme.global.name.value}`
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
            const {data: axiosResponse} = await useAxiosGetUnreadMessageCount(CountType.All)

            if (axiosResponse.code == 0) {
                this.unReadNotifyCount = axiosResponse.data.unreadNotifyCount
            } else {
                warningMsg('获取未读消息数量失败')
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
