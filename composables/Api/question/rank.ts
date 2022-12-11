import { ResponseData } from '~/types/utils/axios'
import { rankParamsI } from '~/composables/Api/article/rank'
import { useGet } from '~/composables/useAxios'
import { User } from '~/types/user'
import { QaGroup, QuestionTag } from '~/types/question'
export const useAxiosGetQuestionRank = (params: rankParamsI) => {
  return useGet<ResponseData<QuestionRankDataI[]>>('data/rank/question', params)
}

export interface QuestionRankDataI {
  id: number
  createTime: number
  user: User
  title: string
  questionState: string
  answerNum: number
  viewNum: number
  collectNum: number
  upNum: number
  downNum: number
  summary: string
  questionTags: QuestionTag
  qaGroup: QaGroup
  scoreCount: number
}
