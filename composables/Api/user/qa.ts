import { ResponseData, ResponsePageData } from '~/types/utils/axios'
import { QuestionState } from '~/types/question'
import { UserAnswerI } from '~/types/question/answer'

export const useAxiosGetUserQuestionPageById = (
  userId: string,
  params: {
    size?: number
    page?: number
    state?: QuestionState
    order?: string
    properties?: string[]
  }
) => {
  return useGet<ResponsePageData<any>>('question/question/field/list/' + userId, params)
}

export const userAxiosGetUserAnswerPageByUserId = (
  userId: string,
  params: {
    size?: number
    page?: number
    order?: string
    properties?: string[]
  }
) => {
  return useGet<ResponsePageData<UserAnswerI>>('question/answer/user/list/' + userId, params)
}