import {defineStore} from 'pinia'
import {errorMsg, successMsg} from '~/composables/utils/toastification'
import {UseAxiosPostGetThumbMeNotify} from '~/composables/Api/messages/thumb'
import {NotifyMsg} from '~/types/message'


interface ReplyState {
    ThumbNotifyList: NotifyMsg[]
    page: number
    totalPages: number
}

export const useThumbStore = defineStore('thumbStore', {
    state: (): ReplyState => {
        return {
            ThumbNotifyList: [],
            page: 1,
            totalPages: null
        }
    },
    getters: {},
    actions: {
        async loadThumbNotifyList(scroll?: boolean) {
            let {data: response} = await UseAxiosPostGetThumbMeNotify(this.page)
            if (response.code == 0) {
                if (scroll) {
                    this.ThumbNotifyList = this.ThumbNotifyList.concat(response.data.content)
                } else {
                    this.ThumbNotifyList = response.data.content
                    this.totalPages = response.data.totalPages
                }
            } else {
                errorMsg(response.msg)
            }
        },
        getGoToLink(notify: NotifyMsg) {
            if (notify.notifyType == NotifyType['点赞了你的评论:']) {
                return '/article/' + notify.articleId + '#comment-' + notify.commentId
            }
            if (notify.notifyType == NotifyType['点赞了你的文章:']) {
                return '/article/' + notify.articleId
            }

        },
    },
})

interface ThumbNotify {
    id: string;
    createTime: number
    lastModifiedTime: number
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

