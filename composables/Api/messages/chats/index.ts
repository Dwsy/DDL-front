import {useGet, usePost} from '~/composables/useAxios'

export const UseAxiosGetPrivateMessageList = () => {
    return useGet('message/private/message/list')
}


export interface GetHistoryMessageParam {
    latest: number
    page: number
    size: number
}

export const UseAxiosGetHistoryMessage = (toUserId: number, params?: GetHistoryMessageParam) => {

    return useGet('message/private/message/pull/' + toUserId, params)
}