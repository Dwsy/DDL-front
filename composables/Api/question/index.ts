import http from '~~/utils/fetch'
import { useDel, useGet, usePost } from '~/composables/useAxios'
import { ResponseData, ResponsePageData } from '~/types/utils/axios'
import { UserActionI } from '~/composables/Api/article'
import { QuestionData } from '~/types/question'

export const useAxiosGetNewQuestionPageList = (page: number) => {
  return useGet<ResponseData<any>>('/qa/question/field/list', { page })
}

export const useFetchGetNewQuestionPageList = (page: number) => {
  const defaultSize = page===1?16:8
  return http.GET<ResponsePageData<QuestionData>>('/qa/question/field/list', { page, size:defaultSize })
  // return useGet<ResponseData<any>>('/qa/question/field/list', {page})
}

export const useFetchGetQuestionField = (questionId: string, getQuestionComment?: boolean) => {
  return http.GET<ResponsePageData<any>>('/qa/question/field/' + questionId, { getQuestionComment })
}

export const useFetchGetQuestionContent = (questionId: string) => {
  return http.GET<ResponsePageData<any>>('/qa/question/content/' + questionId, {
    type: 0
  })
}

export const useFetchGetQuestionGroupList = () => {
  return http.GET<ResponsePageData<any>>('/qa/group/list')
}

export const useAxiosGetUserToQuestionAction = (questionId: string) => {
  return useGet<ResponseData<UserActionI>>('qa/question/action/' + questionId, null)
}
