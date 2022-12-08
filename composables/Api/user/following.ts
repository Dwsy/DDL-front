import http from '~~/utils/fetch'
import { useDel, useGet, usePost } from '~/composables/useAxios'
import { errorMsg, successMsg } from '~/composables/utils/toastification'
import { ResponseData, ResponsePageData } from '~/types/utils/axios'

export const useAxiosPostFollowUser = (fid: string) => {
  return usePost<ResponseData<any>>('user/follow/following', { fid })
}

export const followUser = async (fid: string) => {
  const { data: response } = await useAxiosPostFollowUser(fid)
  if (response.code === 0) {
    successMsg('关注成功')
  } else {
    errorMsg(response.msg)
  }
}

export const unFollowUser = async (fid: string) => {
  const { data: response } = await useAxiosPostUnFollowUser(fid)
  if (response.code === 0) {
    successMsg('取消关注成功')
  } else {
    errorMsg(response.msg)
  }
}

export const useAxiosPostUnFollowUser = (fid: string) => {
  return usePost<ResponseData<any>>('user/follow/unfollow', { fid })
}

export const useAxiosGetFollowingList = (params?: { size?: number; page?: number }) => {
  return useGet<ResponsePageData<any>>('user/follow/following/list', params)
}

export const useAxiosGetFollowerList = (params?: { size?: number; page?: number }) => {
  return useGet<ResponseData<any>>('user/follow/follower/list', params)
}

export const useAxiosGetFollowingListByUserId = (
  userId,
  params?: { size?: number; page?: number }
) => {
  return useGet<ResponseData<any>>('user/follow/following/list/' + userId, params)
}

export const useAxiosGetFollowerListByUserId = (
  userId,
  params?: { size?: number; page?: number }
) => {
  return useGet<ResponseData<any>>('user/follow/follower/list/' + userId, params)
}
