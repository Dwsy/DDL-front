import {useGet, useGetT, usePost, usePut} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'

export const UseAxiosPostGetReplyMeNotify = (page: number) => {
    return useGetT<ResponseData<any>>('message/notify/reply/', {page})
}