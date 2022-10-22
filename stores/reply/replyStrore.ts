import {defineStore} from 'pinia'
import {UseAxiosPostGetReplyMeNotify} from '~/composables/Api/messages/reply'
import {errorMsg} from '#imports'
import {NotifyMsg} from '~/types/message'


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
            let {data: response} = await UseAxiosPostGetReplyMeNotify(this.page)
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

export enum NotifyType {
    '评论了文章:',
    '回复了你的评论:',
    '点赞了你的文章:',
    '点赞了你的评论:',
    '提到了你:',
    '回答了你的问题:',
    '回复了你的回答:',
}
