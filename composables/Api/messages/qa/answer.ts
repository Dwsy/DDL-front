import {useGet} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'
import {PageData} from '~/types/common'
import {NotifyMsg} from '~/types/message'

export const UseAxiosGetQaAnswerNotify = (page: number) => {
    return useGet<ResponseData<PageData<NotifyMsg>>>('message/notify/qa/answer', {
        page,
    })
}

export const useAxiosGetQaInvitationAnswerNotify = (page: number) => {
    return useGet<ResponseData<PageData<NotifyMsg>>>(
        'message/notify/qa/invitationAnswer',
        {page}
    )
}

export const useAxiosGetQaAcceptedAnswerNotify = (page: number) => {
    return useGet<ResponseData<PageData<NotifyMsg>>>(
        'message/notify/qa/accepted',
        {page}
    )
}
