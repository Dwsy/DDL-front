import {useGet, usePost, usePut} from '~/composables/useAxios'

export const UseAxiosPostGetReplyMeNotify = () => {
    return usePost('message/notify/reply/')
}