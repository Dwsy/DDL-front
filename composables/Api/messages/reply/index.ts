import {useGet, usePost, usePut} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'

export const UseAxiosPostGetReplyMeNotify = () => {
    return usePost<ResponseData<any>>('message/notify/reply/')
}