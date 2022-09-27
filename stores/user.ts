import {ref, Ref} from 'vue'
import {defineStore} from 'pinia'
import {useAxiosGetUserInfo, useAxiosPostCheck} from '~/composables/Api/user'

// const token = useCookie<{ token: string }>("token");
interface user {
    IsLogin: Ref<boolean>;
    token: Ref<string>;
    user: tokenMsg;
    userInfo: UserInfo
}

interface UserInfo {
    id: number;
    avatar: string;
    sign: string;
    gender: string;
    birth: any;
}

interface tokenMsg {
    id: number;
    username: string;
    nickname: string;
    level: number;
}


export const useUser = defineStore('user', {
    state: (): user => {
        return {
            IsLogin: ref<boolean>(false),
            user: null,
            token: ref<string>(''),
            userInfo: null
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
            this.user = user
        },
        async getUserInfo() {
            console.log('getUserInfo')
            if (this.user) {
                let {data} = await useAxiosGetUserInfo()
                if (data.code === 0) {
                    this.userInfo = data.data
                }
            }
        },
        async CheckIn() {
            return await useAxiosPostCheck()
        },

    },
})
