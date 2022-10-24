import {useGet} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'

export const useAxiosGetUnreadMessageCount = (type: CountType) => {
    return useGet<ResponseData<unreadNotifyI>>('message/notify/unread', {
        type
    })
}

export interface unreadNotifyI {
    unreadNotifyCount: number

    unreadNotifyReplyCommentCount: number

    unreadNotifyThumbCount: number

    unreadNotifyAnswerCount: number

    unreadPrivateMessageCount: number

    unreadSystemMessageCount: number

    unreadAtMeCount: number
}


export enum CountType {
    All = 'all',//只显示总数
    Detail = 'detail'//明细
}