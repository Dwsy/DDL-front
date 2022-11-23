import { defineStore } from 'pinia'
import { UseAxiosGetReplyMeNotify } from '~/composables/Api/messages/reply'
import { errorMsg } from '~/composables/utils/toastification'
import { NotifyMsg, NotifyType } from '~/types/message'
import { QaCommentType, UseAxiosGetQaCommentNotify } from '~/composables/Api/messages/qa/comment'
import { QaSupportType, UseAxiosGetQaSupportNotify } from '~/composables/Api/messages/qa/support'

interface State {
  qaSupportNotifyList: NotifyMsg[]
  page: number
  totalPages: number
}

export const useQaSupportStore = defineStore('QaSupportStore', {
  state: (): State => {
    return {
      qaSupportNotifyList: [],
      page: 1,
      totalPages: null,
    }
  },
  getters: {},
  actions: {
    async loadQaSupportNotifyList(type: QaSupportType, scroll?: boolean) {
      let { data: response } = await UseAxiosGetQaSupportNotify(this.page, type)
      if (response.code == 0) {
        if (scroll) {
          this.qaSupportNotifyList = this.qaSupportNotifyList.concat(response.data.content)
        } else {
          this.qaSupportNotifyList = response.data.content
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
    },
  },
})
