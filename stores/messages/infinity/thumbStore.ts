import { defineStore } from 'pinia'
import { errorMsg, successMsg } from '~/composables/utils/toastification'
import { useAxiosGetArticleThumbMeNotify } from '~/composables/Api/messages/article/thumb'
import { NotifyMsg, NotifyType, NotifyTypeEn } from '~/types/message'
import { useArticleReplyStore } from '~/stores/messages/article/replyStrore'
import { useAxiosGetInfinityThumbMeNotify } from '~/composables/Api/messages/infinity/thumb'

interface ReplyState {
  ThumbNotifyList: NotifyMsg[]
  page: number
  totalPages: number
}

export const useInfinityThumbStore = defineStore('infinityThumbStore', {
  state: (): ReplyState => {
    return {
      ThumbNotifyList: [],
      page: 1,
      totalPages: null,
    }
  },
  getters: {},
  actions: {
    async loadThumbNotifyList(scroll?: boolean) {
      let { data: response } = await useAxiosGetInfinityThumbMeNotify(this.page)
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
      if (notify.notifyType == NotifyTypeEn.thumbTweet) {
        return '/infinity/status/' + notify.infinityId
      }
    },
  },
})

interface ThumbNotify {
  id: string
  createTime: number
  lastModifiedTime: number
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
