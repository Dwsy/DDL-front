import {useDel, useGet, usePost} from '~/composables/useAxios'
import {getCollectionListByGroupIdParams} from '~/types/user/collection'

export const useAxiosGetCollectionGroupListByUserId = (uid: number) => {
    return useGet('user/collection/group/list/' + uid)
}


export const useAxiosGetCollectionListByGroupId = (groupId: number, params?: getCollectionListByGroupIdParams) => {
    return useGet('user/collection/list/' + groupId, params)
}