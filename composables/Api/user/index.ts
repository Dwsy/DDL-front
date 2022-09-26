import http from '~~/utils/fetch'
import {useGet, usePost} from '~/composables/useAxios'

export const useAxiosGetUserInfo = () => {
    return useGet('user/info')
}

export const useAxiosPostCheck = () => {
    return usePost('user/active/check')
}