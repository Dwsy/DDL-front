import {useGet, usePost, usePut} from '~/composables/useAxios'

export const UseAxiosPostGetThumbMeNotify = () => {
    return usePost('message/notify/thumb/')
}