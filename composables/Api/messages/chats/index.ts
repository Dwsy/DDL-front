import { useGet, usePost, usePut } from '~/composables/useAxios'
import { ResponseData } from '~/types/utils/axios'

export const useAxiosGetPrivateMessageList = () => {
  return useGet<ResponseData<any>>('message/private/message/list')
}

//latest=0 null拉去最新10条
export interface GetMessageParam {
  latest: number
  page: number
  size?: number
}

export const useAxiosGetHistoryMessage = (toUserId: string, params?: GetMessageParam) => {
  return useGet<ResponseData<any>>('message/private/message/pull/' + toUserId, params)
}
export const useAxiosGetMessageByLatestId = (toUserId: string, params?: GetMessageParam) => {
  return useGet<ResponseData<any>>('message/private/message/pull/' + toUserId, params)
}

export const useAxiosPostReadMessageById = (id: string) => {
  return usePost<ResponseData<any>>('message/private/message/read/' + id)
}

export const useAxiosSendMessage = (content: string, toUserId: string) => {
  const body = {
    content,
    toUserId,
  }
  return usePut<ResponseData<any>>('message/private/message/send', body)
}
