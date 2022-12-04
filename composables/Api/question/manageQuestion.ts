import { useDel, useGet, usePost, usePut } from '~/composables/useAxios'
import { GetUserArticleListParams } from '~/types/article/manageArticle'
import { ResponseData } from '~/types/utils/axios'
import { GetUserQuestionListParams } from '~/types/message/manage'

export const useAxiosGetUserQuestionList = (params?: GetUserQuestionListParams) => {
  return useGet<ResponseData<any>>('question/question/manage/field/list', params)
}

export const useAxiosGetQuestionCountByState = () => {
  return useGet<ResponseData<any>>('question/question/manage/field/num')
}

export const useAxiosDelQuestionById = (id: string) => {
  return useDel<ResponseData<boolean>>('question/question/manage/' + id)
}
