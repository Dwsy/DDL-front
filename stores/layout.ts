import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { ThemeInstance } from 'vuetify'
import { CountType, useAxiosGetUnreadMessageCount } from '~/composables/Api/messages'
import { warningMsg } from '~/composables/utils/toastification'

interface layout {
  drawer: boolean
  themeName: string
  showFooter: boolean
  loading: boolean
  unReadNotifyCount:number
}

// const theme = useTheme()
export const useLayout = defineStore('layout', {
  state: (): layout => ({
    drawer: false,
    themeName: '',
    showFooter: false,
    loading: true,
    unReadNotifyCount: 0,
  }),
  getters: {
    getThemeName() {
      return this.themeName
    },
  },
  actions: {
    switchDrawer() {
      this.drawer = !this.drawer
      clog(this.drawer)
    },
    switchTheme(theme: ThemeInstance, themeName?: string) {
      // clog("theme:",theme.global.name.value)
      if (themeName) {
        theme.global.name.value = themeName
      } else {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
        this.themeName = theme.global.name.value
      }

      document.cookie = `theme=${theme.global.name.value};path=/`
    },
    switchLightTheme(theme: ThemeInstance) {
      theme.global.name.value = 'light'
      // document.documentElement.classList.add('dark')
      // document.cookie = `theme=${theme.global.name.value};path=/;max-age=31536000`
    },
    switchDarkTheme(theme: ThemeInstance) {
      theme.global.name.value = 'dark'
      // document.documentElement.classList.remove('dark')
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
        clog(response.data.msg)
      }
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
})
