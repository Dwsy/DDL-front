import {useDel, useGet, usePost, usePut} from '~/composables/useAxios'
import {GetUserArticleListParams} from '~/types/article/manageArticle'
import {ResponseData} from '~/types/utils/axios'
import {GetUserQuestionListParams} from '~/types/message/manage'


export const useAxiosGetUserQuestionList = (params?: GetUserQuestionListParams) => {
    return useGet<ResponseData<any>>('qa/question/manage/field/list', params)
}

export const useAxiosGetQuestionCountByState = () => {
    return useGet<ResponseData<any>>('qa/question/manage/field/num')
}

