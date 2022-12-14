import { useGet, usePost, usePut } from '~/composables/useAxios'
import { ResponseData } from '~/types/utils/axios'
import { useAxiosGetInfinityReplyMeNotify } from '~/composables/Api/messages/infinity/reply'

export const useAxiosGetInfinityThumbMeNotify = (page: number) => {
  return useGet<ResponseData<any>>('message/notify/infinity/thumb', { page })
}
