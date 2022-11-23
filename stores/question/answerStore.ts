import { defineStore } from 'pinia'
import { PageParam } from '~/types/common'
import {
  AnswerQuestionRB,
  QaActionRB,
  useAxiosGetQuestionAnswerPageList,
  useAxiosPostAnswerQuestion,
  useAxiosPostQaAction,
} from '~/composables/Api/question/answer'
import { AnswerData, AnswerType } from '~/types/question/answer'
import { customMsg, successMsg, warningMsg } from '~/composables/utils/toastification'
import { useQuestionStore } from '~/stores/question/questionStore'
import { TYPE } from 'vue-toastification/src/ts/constants'
import { nextTick } from 'vue'

interface AnswerStore {
  pageParam: PageParam
  dataList: Array<AnswerData>
  loadingAnswer: boolean
  totalPages: number
}

export const useAnswerStore = defineStore('AnswerStore', {
  state: (): AnswerStore => ({
    dataList: [],
    pageParam: {
      order: null,
      page: 1,
      properties: null,
      size: 10,
    },
    loadingAnswer: true,
    totalPages: 0,
  }),
  actions: {
    async loadAnswer(questionId: string, change?: boolean, Param?: PageParam) {
      this.loadingAnswer = true
      if (Param) {
        this.pageParam = Param
      }
      const { data: axiosResponse } = await useAxiosGetQuestionAnswerPageList(
        questionId,
        this.pageParam
      )
      if (axiosResponse.code === 0) {
        this.dataList = axiosResponse.data.content
        this.totalPages = axiosResponse.data.totalPages
        this.loadingAnswer = false
        if (change) {
          await nextTick()
          document.querySelector('.answerNum').scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        warningMsg(axiosResponse.msg)
      }
    },

    async answerOrCommentQuestion(body: AnswerQuestionRB, handle?: () => void) {
      if (body.mdText.trim() === '') {
        console.log("body.mdText.trim() === ''", body.mdText.trim() === '')
        if (body.answerType == AnswerType.answer) {
          customMsg('回答不能为空', {
            type: TYPE.WARNING,
            toastClassName: 'd-custom-toast-warning',
          })
        } else {
          customMsg('回复不能为空', {
            type: TYPE.WARNING,
            toastClassName: 'd-custom-toast-warning',
          })
        }

        return
      }
      const { data: axiosResponse } = await useAxiosPostAnswerQuestion(body)
      if (axiosResponse.code === 0) {
        console.log('axiosResponse.data', axiosResponse.data)
        successMsg('回答发送成功')
        if (handle) {
          handle()
        }
        return axiosResponse.data
      } else {
        warningMsg(axiosResponse.msg)
      }
    },

    async action(body: QaActionRB, answerIndex?: number) {
      const { data: axiosResponse } = await useAxiosPostQaAction(body)
      if (axiosResponse.code === 0) {
        if (answerIndex !== undefined) {
          let answer: AnswerData = this.dataList[answerIndex]
          switch (axiosResponse.data) {
            case AnswerType.up:
              answer.upNum++
              answer.userAction = AnswerType.up
              break
            case AnswerType.down:
              answer.downNum++
              answer.userAction = AnswerType.down
              break
            case AnswerType.cancel:
              if (answer.userAction === AnswerType.up) {
                answer.upNum--
                answer.userAction = AnswerType.cancel
              } else if (answer.userAction === AnswerType.down) {
                answer.downNum--
                answer.userAction = AnswerType.cancel
              }
              break
            case AnswerType.upToDown:
              answer.downNum++
              answer.upNum--
              answer.userAction = AnswerType.down
              break
            case AnswerType.downToUp:
              answer.downNum--
              answer.upNum++
              answer.userAction = AnswerType.up
              break
          }
        } else {
          let questionStore = useQuestionStore()
          let support = questionStore.support
          let questionFiled = questionStore.filed
          switch (axiosResponse.data) {
            case AnswerType.up:
              questionFiled.upNum++
              questionStore.support = AnswerType.up
              break
            case AnswerType.down:
              questionFiled.downNum++
              questionStore.support = AnswerType.down
              break
            case AnswerType.cancel:
              if (support === AnswerType.up) {
                questionFiled.upNum--
                questionStore.support = AnswerType.cancel
              } else if (support === AnswerType.down) {
                questionFiled.downNum--
                questionStore.support = AnswerType.cancel
              }
              break
            case AnswerType.upToDown:
              questionFiled.downNum++
              questionFiled.upNum--
              questionStore.support = AnswerType.down
              break
            case AnswerType.downToUp:
              questionFiled.downNum--
              questionFiled.upNum++
              questionStore.support = AnswerType.up
              break
          }
        }
      }
    },

    getActionIcon(action: AnswerType, pIndexId: number, cIndexId?: number) {
      if (cIndexId === undefined) {
        if (this.dataList[pIndexId].userAction === action) {
          if (action === AnswerType.up) {
            return 'mdi-triangle'
          } else {
            return 'mdi-triangle'
          }
        } else {
          if (action === AnswerType.up) {
            return 'mdi-triangle-outline'
          } else {
            return 'mdi-triangle-outline'
          }
        }
      } else {
        if (this.dataList[pIndexId].childComments[cIndexId].userAction === action) {
          if (action === AnswerType.up) {
            return 'mdi-triangle'
          } else {
            return 'mdi-triangle'
          }
        } else {
          if (action === AnswerType.up) {
            return 'mdi-triangle-outline'
          } else {
            return 'mdi-triangle-outline'
          }
        }
      }
    },
    getActionColor(action: AnswerType, pIndexId: number, cIndexId?: number) {
      if (cIndexId === undefined) {
        if (this.dataList[pIndexId].userAction === action) {
          return 'blue-lighten-2'
        } else {
          return 'grey'
        }
      } else {
        if (this.dataList[pIndexId].childComments[cIndexId].userAction === action) {
          return 'blue-lighten-2'
        } else {
          return 'grey'
        }
      }
    },
  },
})
