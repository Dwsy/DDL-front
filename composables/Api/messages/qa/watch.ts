import {useGet} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'
import {PageData} from '~/types/common'
import {NotifyMsg} from '~/types/message'

export enum QaWatchType {
    new,
    accepted
}

export const UseAxiosGetQaWatchNotify = (page: number, type: QaWatchType) => {
    return useGet<ResponseData<PageData<NotifyMsg>>>('message/notify/qa/watch', {page, type})
}