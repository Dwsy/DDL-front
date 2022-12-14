import { defineStore } from 'pinia'
import { useAxiosGetArticleReplyMeNotify } from '~/composables/Api/messages/article/reply'
import { errorMsg } from '~/composables/utils/toastification'
import { NotifyMsg, NotifyType } from '~/types/message'
import { useAxiosGetQaAnswerNotify } from '~/composables/Api/messages/qa/answer'

interface State {
  qaAnswerNotifyList: NotifyMsg[]
  page: number
  totalPages: number
}

export const useQaAnswerStore = defineStore('qaAnswerStore', {
  state: (): State => {
    return {
      qaAnswerNotifyList: [],
      page: 1,
      totalPages: 0,
    }
  },
  getters: {},
  actions: {
    async loadQaAnswerNotifyList(scroll?: boolean) {
      let { data: response } = await useAxiosGetQaAnswerNotify(this.page)
      if (response.code == 0) {
        if (scroll) {
          this.qaAnswerNotifyList = this.qaAnswerNotifyList.concat(response.data.content)
        } else {
          this.qaAnswerNotifyList = response.data.content
          this.totalPages = response.data.totalPages
        }
      } else {
        errorMsg(response.msg)
      }
    },
    getGoToLink(notify: NotifyMsg) {
      if (notify.notifyType == NotifyType['回复了你的评论:']) {
        return '/article/' + notify.articleId + '#comment-' + notify.replyCommentId
        // return '/article/' + notify.articleId
      }
      if (notify.notifyType == NotifyType['评论了文章:']) {
        return '/article/' + notify.articleId
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
