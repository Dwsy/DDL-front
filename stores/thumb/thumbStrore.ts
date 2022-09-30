import {defineStore} from 'pinia'
import {UseAxiosPostGetReplyMeNotify} from '~/composables/Api/messages/reply'
import {errorMsg} from '#imports'
import {UseAxiosPostGetThumbMeNotify} from '~/composables/Api/messages/thumb'


interface ReplyState {
    ThumbNotifyList: ThumbNotify[]
}

export const useThumbStore = defineStore('thumbStore', {
    state: (): ReplyState => {
        return {
            ThumbNotifyList: []
        }
    },
    getters: {},
    actions: {
        async loadThumbNotifyList() {
            let {data: response} = await UseAxiosPostGetThumbMeNotify()
            if (response.code == 0) {
                this.ThumbNotifyList = response.data.content
            } else {
                errorMsg(response.msg)
            }
        },
        getGoToLink(notify: ThumbNotify) {
            if (notify.notifyType == NotifyType['点赞了你的评论:']) {
                return '/article/' + notify.articleId + '#comment-' + notify.commentId
            }
            if (notify.notifyType == NotifyType['点赞了你的文章:']) {
                return '/article/' + notify.articleId
            }

        }
    },
})

interface ThumbNotify {
    id: number;
    fromUserId: number;
    toUserId: number;
    articleId: number;
    commentId: number;
    questionId: number;
    answerId: number;
    notifyType: NotifyType;
    formContent: string;
    toContent: string;
    replayCommentId: number;
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

