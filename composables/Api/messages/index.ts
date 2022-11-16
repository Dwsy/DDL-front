import {useGet} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'

export const useAxiosGetUnreadMessageCount = (type: CountType) => {
    return useGet<ResponseData<unreadNotifyI>>('message/notify/unread', {type}, true)
}

export interface unreadNotifyI {
    unreadNotifyCount: number

    unreadNotifyReplyCommentCount: number

    ArticleOrCommentThumbCount: number

    QuestionOrAnswerThumbCount: number

    unreadNotifyAnswerCount: number

    unreadNotifyAnswerCommentCount: number

    unreadNotifyQuestionCommentCount: number

    unreadPrivateMessageCount: number

    unreadSystemMessageCount: number

    unreadAtMeCount: number

    unreadInvitationAnswerCount: number

    unreadAcceptedAnswerCount: number

    unreadNotifyQuestionOrAnswerThumbCount: number

    unreadWatchAnswer: number

    unreadWatchAcceptedQuestionAnswer: number
}

export enum unreadNotifyEnum {
    unreadNotifyCount,

    unreadNotifyReplyCommentCount,

    ArticleOrCommentThumbCount,

    QuestionOrAnswerThumbCount,

    unreadNotifyAnswerCount,

    unreadNotifyAnswerCommentCount,

    unreadNotifyQuestionCommentCount,

    unreadPrivateMessageCount,

    unreadSystemMessageCount,

    unreadAtMeCount,

    unreadInvitationAnswerCount,

    unreadAcceptedAnswerCount
}

export enum CountType {
    All = 'all',//只显示总数
    Detail = 'detail'//明细
}