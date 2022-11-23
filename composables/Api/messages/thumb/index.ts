import { useGet, usePost, usePut } from '~/composables/useAxios'
import { ResponseData } from '~/types/utils/axios'

export const UseAxiosGetThumbMeNotify = (page: number) => {
  return useGet<ResponseData<any>>('message/notify/thumb', { page })
}
