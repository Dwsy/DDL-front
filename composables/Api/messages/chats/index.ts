import {useGet, usePost, usePut} from '~/composables/useAxios'

export const UseAxiosGetPrivateMessageList = () => {
    return useGet('message/private/message/list')
}

//latest=0 null拉去最新10条
export interface GetMessageParam {
    latest: number
    page: number
    size?: number
}

export const UseAxiosGetHistoryMessage = (toUserId: number, params?: GetMessageParam) => {

    return useGet('message/private/message/pull/' + toUserId, params)
}
export const UseAxiosGetMessageByLatestId = (toUserId: number, params?: GetMessageParam) => {

    return useGet('message/private/message/pull/' + toUserId, params)
}

export const UseAxiosPostReadMessageById = (id: number) => {

    return usePost('message/private/message/read/' + id)
}

export const UseAxiosSendMessage = (content: string, toUserId: number) => {
    const body = {
        content,
        toUserId
    }
    return usePut('message/private/message/send', body)
}