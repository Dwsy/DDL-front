import {useGet, usePost, usePut} from '~/composables/useAxios'

export const UseAxiosPostGetReplyMeNotify = () => {
    return usePost<ResponseData<any>>('message/notify/reply/')
}