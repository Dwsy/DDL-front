import { defineStore } from 'pinia'
import { useAxiosGetArticleReplyMeNotify } from '~/composables/Api/messages/article/reply'
import { errorMsg } from '~/composables/utils/toastification'
import { NotifyMsg, NotifyType, NotifyTypeEn } from '~/types/message'
import { useAxiosGetInfinityReplyMeNotify } from '~/composables/Api/messages/infinity/reply'

interface ReplyState {
  replyNotifyList: NotifyMsg[]
  page: number
  totalPages: number
}

export const useInfinityReplyStore = defineStore('infinityReplyNotify', {
  state: (): ReplyState => {
    return {
      replyNotifyList: [],
      page: 1,
      totalPages: null,
    }
  },
  getters: {},
  actions: {
    async loadReplyNotifyList(scroll?: boolean) {
      let { data: response } = await useAxiosGetInfinityReplyMeNotify(this.page)
      if (response.code == 0) {
        if (scroll) {
          this.replyNotifyList = this.replyNotifyList.concat(response.data.content)
        } else {
          this.replyNotifyList = response.data.content
          this.totalPages = response.data.totalPages
        }
      } else {
        errorMsg(response.msg)
      }
    },
    getGoToLink(notify: NotifyMsg) {
      if (notify.notifyType == NotifyTypeEn.comment_tweet) {
        return '/infinity/status/' + notify.infinityId
      }
      if (notify.notifyType == NotifyTypeEn.reply_reply_comment_tweet) {
        return '/infinity/status/' + notify.infinityId
      }
      if (notify.notifyType == NotifyTypeEn.reply_comment_tweet) {
        return '/infinity/status/' + notify.infinityId
      }
    },
  },
})

export interface replyNotify {
  id: string
  fromUserId: string
  toUserId: string
  articleId: string
  commentId: string
  questionId: string
  answerId: string
  notifyType: NotifyType
  formContent: string
  toContent: string
  replyCommentId: string
  notifyState: number
  formUserAvatar: string
  formUserNickname: string
}
