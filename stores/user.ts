import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { useAxiosGetUserInfo, useAxiosPostCheck } from '~/composables/Api/user'

// const token = useCookie<{ token: string }>("token");
export interface user {
  IsLogin: Ref<boolean>
  token: Ref<string>
  user: tokenMsg
  userInfo: UserInfo
}

export interface UserInfo {
  id: string
  avatar: any
  avatarNew?: any
  level: number
  sign: string
  gender: string
  birth: any
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
      clog('getUserInfo', this.userInfo === null)
      if (refresh || this.userInfo === null) {
        if (this.user) {
          let { data } = await useAxiosGetUserInfo()
          if (data.code === 0) {
            this.userInfo = data.data
          }
        }
      }
    },
    async CheckIn() {
      return await useAxiosPostCheck()
    },
  },
})
