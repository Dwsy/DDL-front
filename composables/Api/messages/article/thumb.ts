import { useGet, usePost, usePut } from '~/composables/useAxios'
import { ResponseData } from '~/types/utils/axios'
import { useAxiosGetArticleReplyMeNotify } from '~/composables/Api/messages/article/reply'

export const useAxiosGetArticleThumbMeNotify = (page: number) => {
  return useGet<ResponseData<any>>('message/notify/article/thumb', { page })
}
