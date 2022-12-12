import http from '~~/utils/fetch'
import { useDel, useGet, usePost } from '~/composables/useAxios'
import { ResponseData, ResponsePageData } from '~/types/utils/axios'
import { UserActionI } from '~/composables/Api/article'
import { QaGroup, QuestionData, QuestionState } from '~/types/question'

export const useAxiosGetNewQuestionPageList = (page: number) => {
  return useGet<ResponseData<any>>('question/question/field/list', { page })
}

export const useFetchGetNewQuestionPageList = (page: number,status:QuestionState[]) => {
  const defaultSize = page === 1 ? 16 : 8
  return http.GET<ResponsePageData<QuestionData>>('question/question/field/list', {
    page,
    size: defaultSize,
    status
  })
  // return useGet<ResponseData<any>>('question/question/field/list', {page})
}

export const useFetchGetQuestionField = (questionId: string, getQuestionComment?: boolean) => {
  return http.GET<ResponsePageData<any>>('question/question/field/' + questionId, {
    getQuestionComment,
  })
}

export const useFetchGetQuestionContent = (questionId: string) => {
  return http.GET<ResponsePageData<any>>('question/question/content/' + questionId, {
    type: 0,
  })
}

export const useFetchGetQuestionGroupList = () => {
  return http.GET<ResponseData<QaGroup[]>>('question/group/list')
}

export const useAxiosGetUserToQuestionAction = (questionId: string) => {
  return useGet<ResponseData<UserActionI>>('question/question/action/' + questionId, null)
}
