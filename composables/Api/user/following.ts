import http from '~~/utils/fetch'
import {useDel, useGet, usePost} from '~/composables/useAxios'
import {errorMsg, successMsg} from '~/composables/utils/toastification'


export const useAxiosPostFollowUser = (fid: string) => {
    return usePost('user/follow/following', {fid})
}

export const followUser = async (fid: string) => {
    const {data: response} = await useAxiosPostFollowUser(fid)
    if (response.code === 0) {
        successMsg('关注成功')
    } else {
        errorMsg(response.msg)
    }
}

export const unFollowUser = async (fid: string) => {
    const {data: response} = await useAxiosPostUnFollowUser(fid)
    if (response.code === 0) {
        successMsg('取消关注成功')
    } else {
        errorMsg(response.msg)
    }
}

export const useAxiosPostUnFollowUser = (fid: string) => {
    return usePost('user/follow/unfollow', {fid})
}

export const useAxiosGetFollowingList = (params?: { size?: number, page?: number }) => {
    return useGet('user/follow/following/list', params)
}

export const useAxiosGetFollowerList = (params?: { size?: number, page?: number }) => {
    return useGet('user/follow/follower/list', params)
}