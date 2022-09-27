import {useGet, usePost} from '~/composables/useAxios'

export const UseAxiosGetPrivateMessageList = () => {
    return useGet('message/private/message/list')
}