import {defineStore} from 'pinia'
import {UseAxiosGetReplyMeNotify} from '~/composables/Api/messages/reply'
import {errorMsg} from '~/composables/utils/toastification'
import {NotifyMsg, NotifyType} from '~/types/message'


interface ReplyState {
    replyNotifyList: NotifyMsg[]
    page: number
    totalPages: number
}

export const useReplyStore = defineStore('replyNotify', {
    state: (): ReplyState => {
        return {
            replyNotifyList: [],
            page: 1,
            totalPages: null
        }
    },
    getters: {},
    actions: {
        async loadReplyNotifyList(scroll?: boolean) {
            let {data: response} = await UseAxiosGetReplyMeNotify(this.page)
            if (response.code == 0) {
                if (scroll) {
                    this.replyNotifyList = this.replyNotifyList
                        .concat(response.data.content)
                } else {
                    this.replyNotifyList = response.data.content
                    this.totalPages = response.data.totalPages
                }
            } else {
                errorMsg(response.msg)
            }
        },
        getGoToLink(notify: NotifyMsg) {
            if (notify.notifyType == NotifyType['回复了你的评论:']) {
                return '/article/' + notify.articleId + '#comment-' + notify.replayCommentId
                // return '/article/' + notify.articleId
            }
            if (notify.notifyType == NotifyType['评论了文章:']) {
                return '/article/' + notify.articleId
            }
        }
    },
})

export interface replyNotify {
    id: string;
    fromUserId: string;
    toUserId: string;
    articleId: string;
    commentId: string;
    questionId: string;
    answerId: string;
    notifyType: NotifyType;
    formContent: string;
    toContent: string;
    replayCommentId: string;
    notifyState: number;
    formUserAvatar: string
    formUserNickname: string
}
