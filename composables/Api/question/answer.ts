import http from '~~/utils/fetch'
import {useDel, useGet, useGetT, usePost} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'
import {PageParam} from '~/types/common'

export const useAxiosGetQuestionAnswerPageList = (questionId: string, param: PageParam) => {
    return useGet<ResponseData<any>>(`/qa/answer/${questionId}`, param)
}