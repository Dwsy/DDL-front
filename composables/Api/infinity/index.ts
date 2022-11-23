import { useDel, useGet, usePost } from '~/composables/useAxios'
import { ResponseData } from '~/types/utils/axios'
import { InfinityI } from '~/types/infinity'

export interface GetInfinityPageListParams {
  order?: string
  properties?: string[]
  size?: number
  page?: number
  clubId?: string
  topicId?: string
}

export const useAxiosGetInfinityPageList = (params: GetInfinityPageListParams) => {
  return useGet<ResponseData<InfinityI>>('infinity/infinity/list', params)
}
