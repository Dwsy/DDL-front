import http from '~~/utils/fetch'
import {useDel, useGet, useGetT, usePost} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'

export const useAxiosGetNewQuestionPageList = (page: number) => {
    return useGet<ResponseData<any>>('/qa/question/field/list', {page})
}

export const useFetchGetNewQuestionPageList = (page: number) => {
    return http.GET('/qa/question/field/list', {page})
    // return useGet<ResponseData<any>>('/qa/question/field/list', {page})
}

export const useFetchGetQuestionField = (questionId: string, getQuestionComment?: boolean) => {
    return http.GET('/qa/question/field/' + questionId, {getQuestionComment})
}

export const useFetchGetQuestionContent = (questionId: string) => {
    return http.GET('/qa/question/content/' + questionId,
        {
            type: 0
        }
    )
}