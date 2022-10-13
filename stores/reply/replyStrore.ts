import {defineStore} from 'pinia'
import {UseAxiosPostGetReplyMeNotify} from '~/composables/Api/messages/reply'
import {errorMsg} from '#imports'


interface ReplyState {
    replyNotifyList: replyNotify[]
}

export const useReplyStore = defineStore('replyNotify', {
    state: (): ReplyState => {
        return {
            replyNotifyList: []
        }
    },
    getters: {},
    actions: {
        async loadReplyNotifyList() {
            let {data: response} = await UseAxiosPostGetReplyMeNotify()
            if (response.code == 0) {
                this.replyNotifyList = response.data.content
            } else {
                errorMsg(response.msg)
            }
        },
        getGoToLink(notify: replyNotify) {
            if (notify.notifyType == NotifyType['回复了你的评论:']) {
                return '/article/' + notify.articleId + '#comment-' + notify.replayCommentId
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
    notifyType: number;
    formContent: string;
    toContent: string;
    replayCommentId: string;
    notifyState: NotifyType;
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
