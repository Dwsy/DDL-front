import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  useAxiosGetNewQuestionPageList,
  useFetchGetNewQuestionPageList,
} from '~/composables/Api/question'
import { QuestionData } from '~/types/question'

interface QuestionIndexStore {
  page: number
  dataList: Array<QuestionData>
  totalPages: number
}

export const useQuestionIndexStore = defineStore('QuestionIndexStore', {
  state: (): QuestionIndexStore => ({
    page: 1,
    dataList: [],
    totalPages: 0,
  }),
  actions: {
    async loadQuestion() {
      const data = await useFetchGetNewQuestionPageList(this.page)
      // clog(data)
      if (data.code === 0) {
        if (this.page===1) {
          this.dataList = data.data.content
          this.totalPages=data.data.totalPages
        }else {
          this.dataList = this.dataList.concat(data.data.content)
        }
      }
    },
  },
})
