import { defineStore } from 'pinia'
import { useFetchGetNewQuestionPageList } from '~/composables/Api/question'
import { QuestionData, QuestionField, QuestionState } from '~/types/question'

interface QuestionIndexStore {
  page: number
  dataList: Array<QuestionField>
  totalPages: number
  status: QuestionState[] | QuestionState
}

export const lastStatus = [
  QuestionState.ASK,
  QuestionState.UNRESOLVED,
  QuestionState.HAVE_ANSWER,
  QuestionState.RESOLVED,
]

export const useQuestionIndexStore = defineStore('QuestionIndexStore', {
  state: (): QuestionIndexStore => ({
    page: 1,
    dataList: [],
    totalPages: 0,
    status: lastStatus,
  }),
  actions: {
    async loadQuestion() {
      const data = await useFetchGetNewQuestionPageList(this.page, this.status)
      // clog(data)
      if (data.code === 0) {
        if (this.page === 1) {
          this.dataList = data.data.content
          this.totalPages = data.data.totalPages
        } else {
          this.dataList = this.dataList.concat(data.data.content)
        }
      }
    },
  },
})
