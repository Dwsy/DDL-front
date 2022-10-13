import {useDel, useGet, usePost} from '~/composables/useAxios'
import {getCollectionListByGroupIdParams} from '~/types/user/collection'

export const useAxiosGetCollectionGroupListByUserId = (uid: string) => {
    return useGet('user/collection/group/list/' + uid)
}


export const useAxiosGetCollectionListByGroupId = (groupId: string, params?: getCollectionListByGroupIdParams) => {
    return useGet('user/collection/list/' + groupId, params)
}