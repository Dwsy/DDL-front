import { defineStore } from 'pinia'
import { useAxiosGetArticleReplyMeNotify } from '~/composables/Api/messages/article/reply'
import { errorMsg } from '~/composables/utils/toastification'
import { NotifyMsg, NotifyType } from '~/types/message'
import { QaCommentType, useAxiosGetQaCommentNotify } from '~/composables/Api/messages/qa/comment'

interface State {
  qaCommentNotifyList: NotifyMsg[]
  page: number
  totalPages: number
}

export const useQaCommentStore = defineStore('QaCommentStore', {
  state: (): State => {
    return {
      qaCommentNotifyList: [],
      page: 1,
      totalPages: null,
    }
  },
  getters: {},
  actions: {
    async loadQaCommentNotifyList(type: QaCommentType, scroll?: boolean) {
      let { data: response } = await useAxiosGetQaCommentNotify(this.page, type)
      if (response.code == 0) {
        if (scroll) {
          this.qaCommentNotifyList = this.qaCommentNotifyList.concat(response.data.content)
        } else {
          this.qaCommentNotifyList = response.data.content
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
