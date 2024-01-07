import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { useAxiosGetUserInfo, useAxiosPostCheck } from '~/composables/Api/user'
import { usePost } from '~/composables/useAxios'
import { ResponseData } from '~/types/utils/axios'
import { successMsg } from '~/composables/utils/toastification'
import { User } from '@icon-park/svg'

// const token = useCookie<{ token: string }>("token");
export interface user {
  IsLogin: Ref<boolean>
  token: Ref<string>
  user: tokenMsg
  userInfo: UserInfo
  check: boolean
  admin: boolean
}

export interface UserInfo {
  id: string
  avatar: any
  avatarNew?: any
  level?: number
  sign: string
  gender: string
  birth: any
  experience?: number

  tagStr: string
}

interface tokenMsg {
  id: string
  username: string
  nickname: string
  // level: number;
}

export const useUserStore = defineStore('user', {
  state: (): user => {
    return {
      IsLogin: ref<boolean>(false),
      user: null,
      token: ref<string>(''),
      userInfo: null,
      check: false,
    }
  },
  actions: {
    setIsLogin(login: boolean) {
      this.IsLogin = login
    },
    setToken(token: string) {
      this.token = token
    },
    setUser(user: any) {
      // clog('setUser:', user)
      // clog('setUserType:', typeof user)
      if (user != null) this.user = user
    },
    async getUserInfo(refresh = false) {
      // clog('getUserInfo', this.userInfo === null)
      if (refresh || this.userInfo === null) {
        if (this.user) {
          let { data } = await useAxiosGetUserInfo()
          if (data.code === 0) {
            this.userInfo = data.data
            this.check = data.data.checkIn
          }
        }
      }
    },
    async CheckIn() {
      return await useAxiosPostCheck()
    },
    async logout() {
      try {
        const axiosResponse = await usePost<ResponseData<boolean>>('auth/logout')
        console.log(axiosResponse)
        useUserStore().$reset()
        localStorage.clear()
        navigateTo('/')
        successMsg('退出成功')
      } catch (e) {
        console.log('logout', e)
      }
    },
    async checkIn() {
      if (!this.check) {
        const { data } = await useAxiosPostCheck()
        if (data.code === 0) {
          this.check = true
        }
      }
    },
  },
})
