import { ResponseData } from '~/types/utils/axios'
import { ArticleGroup, ArticleTag } from '~/types/article'
import { User } from '~/types/user'

export interface rankParamsI {
  daysAgo: number
  size?: number
  groupId?: string
}
export const useAxiosGetArticleRank = (params: rankParamsI) => {
  return useGet<ResponseData<ArticleRankDataI[]>>('data/rank/article', params)
}

export interface ArticleRankDataI {
  id: number
  createTime: number
  upNum: number
  downNum: number
  user: User
  title: string
  summary: string
  commentNum: number
  viewNum: number
  collectNum: number
  banner: string
  articleSource: string
  articleSourceUrl: any
  articleTags: ArticleTag[]
  articleGroup: ArticleGroup
  scoreCount: number
}
