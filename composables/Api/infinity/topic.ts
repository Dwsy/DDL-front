import { usePost } from '~/composables/useAxios'
import { ResponseData } from '~/types/utils/axios'
import { InfinityTopic } from '~/types/infinity'

export interface CreateTopicBody {
  name: string
  description?: string
  cover?: string
  notice?: string
}

export interface UpdateTopicBody extends CreateTopicBody {
  id: number
}

export const useAxiosPostCreateTopic = (createTopicBody: CreateTopicBody) => {
  return usePost<ResponseData<InfinityTopic>>('/infinity/topic', createTopicBody)
}

export const useAxiosPutUpdateTopic = (updateTopicBody: UpdateTopicBody) => {
  return usePut<ResponseData<InfinityTopic>>('/infinity/topic', updateTopicBody)
}
