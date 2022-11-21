import {useDel, useGet, usePost} from '~/composables/useAxios'
import {getCollectionListByGroupIdParams} from '~/types/user/collection'
import {ResponseData} from '~/types/utils/axios'

export const useAxiosGetCollectionGroupListByUserId = (uid: string) => {
    return useGet<ResponseData<any>>('user/collection/group/list/' + uid)
}

export const useAxiosGetCollectionListByGroupId = (
    groupId: string,
    params?: getCollectionListByGroupIdParams
) => {
    return useGet<ResponseData<any>>('user/collection/list/' + groupId, params)
}
