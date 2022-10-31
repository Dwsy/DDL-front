import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useAxiosGetNewQuestionPageList, useFetchGetNewQuestionPageList} from '~/composables/Api/question'
import {QuestionData} from '~/types/question'
import {PageParam} from '~/types/common'
import {useAxiosGetQuestionAnswerPageList} from '~/composables/Api/question/answer'
import {AnswerData} from '~/types/question/answer'

interface AnswerStore {
    pageParam: PageParam
    dataList: Array<AnswerData>
}

export const useAnswerStore = defineStore('AnswerStore', {
    state: (): AnswerStore => (
        {
            dataList: [],
            pageParam: {
                order: null,
                page: 0,
                properties: null,
                size: 10
            },
        }
    ),
    actions: {

        async loadAnswer(questionId: string) {
            const {data: axiosResponse} = await useAxiosGetQuestionAnswerPageList(questionId, this.pageParam)
            if (axiosResponse.code === 0) {
                this.dataList = axiosResponse.data.content
            }
        },


    },
})