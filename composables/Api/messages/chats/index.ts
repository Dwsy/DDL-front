import {useGet, usePost, usePut} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'

export const UseAxiosGetPrivateMessageList = () => {
    return useGet<ResponseData<any>>('message/private/message/list')
}

//latest=0 null拉去最新10条
export interface GetMessageParam {
    latest: number
    page: number
    size?: number
}

export const UseAxiosGetHistoryMessage = (toUserId: string, params?: GetMessageParam) => {

    return useGet<ResponseData<any>>('message/private/message/pull/' + toUserId, params)
}
export const UseAxiosGetMessageByLatestId = (toUserId: string, params?: GetMessageParam) => {

    return useGet<ResponseData<any>>('message/private/message/pull/' + toUserId, params)
}

export const UseAxiosPostReadMessageById = (id: string) => {

    return usePost<ResponseData<any>>('message/private/message/read/' + id)
}

export const UseAxiosSendMessage = (content: string, toUserId: string) => {
    const body = {
        content,
        toUserId
    }
    return usePut('message/private/message/send', body)
}