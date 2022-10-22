import {useGet, usePost, usePut} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'

export const UseAxiosPostGetReplyMeNotify = (page: number) => {
    return usePost<ResponseData<any>>('message/notify/reply/', {page})
}