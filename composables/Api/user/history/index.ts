import { ResponseData, ResponsePageData } from '~/types/utils/axios'
import { useDel, useGet, usePost } from '~/composables/useAxios'
import { User } from '~/types/user'

export type getHistoryType = 'all' | 'article' | 'question' | 'infinity'

export interface UserHistoryI {
  id: string
  createTime: number
  user: User
  title: string
  summary: string
  banner: any
  userActiveType: string
}

export const useAxiosGetUserHistory = (type: getHistoryType, page: number) => {
  return useGet<ResponsePageData<UserHistoryI>>('user/active/history', {
    type,
    page,
  })
}
