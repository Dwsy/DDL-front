import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useAxiosGetNewQuestionPageList, useFetchGetNewQuestionPageList} from '~/composables/Api/question'
import {QuestionData} from '~/types/question'
import {PageParam} from '~/types/common'
import {
    AnswerQuestionRB, QaActionRB,
    useAxiosGetQuestionAnswerPageList,
    useAxiosPostAnswerQuestion, useAxiosPostQaAction
} from '~/composables/Api/question/answer'
import {AnswerData, AnswerType} from '~/types/question/answer'
import {warningMsg} from '~/composables/utils/toastification'
import {CommentType} from '~/composables/Api/article'

interface AnswerStore {
    pageParam: PageParam
    dataList: Array<AnswerData>
    loadingAnswer: boolean
    totalPages: number
}

export const useAnswerStore = defineStore('AnswerStore', {
    state: (): AnswerStore => (
        {
            dataList: [],
            pageParam: {
                order: null,
                page: 1,
                properties: null,
                size: 10
            },
            loadingAnswer: true,
            totalPages: 0,

        }
    ),
    actions: {

        async loadAnswer(questionId: string, Param?: PageParam) {
            this.loadingAnswer = true
            if (Param) {
                this.pageParam = Param
            }
            const {data: axiosResponse} = await useAxiosGetQuestionAnswerPageList(questionId, this.pageParam)
            if (axiosResponse.code === 0) {
                this.dataList = axiosResponse.data.content
                this.loadingAnswer = false
            } else {
                warningMsg(axiosResponse.msg)
            }
        },

        async answerQuestion(body: AnswerQuestionRB) {
            const {data: axiosResponse} = await useAxiosPostAnswerQuestion(body)
            if (axiosResponse.code === 0) {
                console.log('axiosResponse.data', axiosResponse.data)
                return axiosResponse.data
            } else {
                warningMsg(axiosResponse.msg)
            }
        },

        async action(body: QaActionRB, answerIndex?: number) {
            const {data: axiosResponse} = await useAxiosPostQaAction(body)
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

                }
                console.log('axiosResponse.data', axiosResponse.data)
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