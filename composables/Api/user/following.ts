import http from '~~/utils/fetch'
import {useGet, usePost} from '~/composables/useAxios'

export const useAxiosPostFollowUser = (fid: number) => {
    return usePost('article/comment/', {fid})
}