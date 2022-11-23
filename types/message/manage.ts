import { QuestionState } from '~/types/question'

export interface GetUserQuestionListParams {
  order?: string
  properties?: string
  page?: number
  size?: number
  state: QuestionState
  tagId?: string
}
