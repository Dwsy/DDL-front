import http from '~~/utils/fetch'
import {useDel, useGet, usePost} from '~/composables/useAxios'
import {errorMsg, successMsg} from '~/composables/utils/toastification'


export const useAxiosPostFollowUser = (fid: number) => {
    return usePost('user/following/follow', {fid})
}

export const followUser = async (fid: number) => {
    const {data: response} = await useAxiosPostFollowUser(fid)
    if (response.code === 0) {
        successMsg('关注成功')
    } else {
        errorMsg(response.msg)
    }
}

export const unFollowUser = async (fid: number) => {
    const {data: response} = await useAxiosPostUnFollowUser(fid)
    if (response.code === 0) {
        successMsg('取消关注成功')
    } else {
        errorMsg(response.msg)
    }
}

export const useAxiosPostUnFollowUser = (fid: number) => {
    return usePost('user/following/unfollow', {fid})
}