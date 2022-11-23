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
}

export const useQuestionIndexStore = defineStore('QuestionIndexStore', {
  state: (): QuestionIndexStore => ({
    page: 1,
    dataList: [],
  }),
  actions: {
    async loadNewQuestion() {
      const data = await useFetchGetNewQuestionPageList(this.page)
      // console.log(data)
      if (data.code === 0) {
        this.dataList = data.data.content
      }
    },
  },
})
