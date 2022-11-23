import { defineStore } from 'pinia'
import { errorMsg, successMsg } from '~/composables/utils/toastification'
import { UseAxiosGetThumbMeNotify } from '~/composables/Api/messages/thumb'
import { NotifyMsg, NotifyType } from '~/types/message'

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
      totalPages: null,
    }
  },
  getters: {},
  actions: {
    async loadThumbNotifyList(scroll?: boolean) {
      let { data: response } = await UseAxiosGetThumbMeNotify(this.page)
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
  replayCommentId: string
  notifyState: number
  formUserAvatar: string
  formUserNickname: string
}
