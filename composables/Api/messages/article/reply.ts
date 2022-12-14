import { useGet, useGetT, usePost, usePut } from '~/composables/useAxios'
import { ResponseData } from '~/types/utils/axios'
import { PageData } from '~/types/common'
import { NotifyMsg } from '~/types/message'

export const useAxiosGetArticleReplyMeNotify = (page: number) => {
  return useGet<ResponseData<PageData<NotifyMsg>>>('message/notify/article/reply', {
    page,
  })
}
