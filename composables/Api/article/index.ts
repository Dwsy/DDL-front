import http from '~~/utils/fetch'
import {useDel, useGet, usePost} from '~/composables/useAxios'
import {collectionData, collectionType} from '~/types/article'

export const useFetchGetArticleGroupList = (params?: { size?: number, page?: number }) => {
    return http.GET('article/group/list', params)
}

export const useFetchGetArticleList = (params?:
                                           { size?: number, page?: number, tagId?: string, order?: string, properties?: string }) => {
    return http.GET('article/article/field/list', params)
}

export const useFetchGetArticleField = (id) => {
    return http.GET('article/article/field/' + id, null)
}

export const useFetchGetArticleContent = (id, params?: { type?: number }) => {
    return http.GET('article/article/content/' + id, params)
}

//----
export const useFetchGetArticleComment = (id, params?: { size?: number, page?: number }) => {
    return http.GET('article/comment/' + id, params)
}
export const useAxiosGetArticleChildComment = (aid, pid, params?: { properties?: string, order?: string, size?: number, page?: number }) => {
    return useGet(`article/comment/child/${aid}-${pid}`, params)
}
export const useAxiosGetArticleComment = (id, params?: { properties?: string, order?: string, size?: number, page?: number }) => {
    return useGet('article/comment/' + id, params)
}


//----
export interface ReplyArticleCommentBody {
    articleFieldId: number;
    parentCommentId: number;
    replyUserId: number;
    replyUserCommentId: number
    text: string;
}


export const useAxiosPostReplyArticleComment = (body: ReplyArticleCommentBody) => {
    return usePost('article/comment', body)
}


//----
export interface ArticleCommentAction {
    actionCommentId: number;
    actionUserId?: number;
    articleFieldId: number;
    commentType?: commentType;
}

export enum commentType {
    comment, comment_comment,
    up, down, cancel,
    upToDown, downToUp
}

export const useAxiosGetArticleAction = (aid: number) => {
    return useGet('article/article/field/action/' + aid, null)
}

export const useAxiosPostActionArticleComment = (body: ArticleCommentAction) => {
    return usePost('article/comment/action', body)
}

//----

export const useFetchGetArticleTagListByGroupId = (id?, params?: { order?: string, properties?: string }) => {
    return http.GET('article/tag/group/list/' + id, params)
}

export const useFetchGetArticleTagList = (params?: { order?: string, properties?: string }) => {
    return http.GET('article/tag/list/', params)
}

export const useAxiosGetCollectionGroupList = () => {
    return useGet('user/collection/group/list')
}
// private String groupName;
// private Long groupId;
// private int order;
export const useAxiosPostCreateCollectionGroup = (body: {
    groupName: string, order: number
}) => {
    return usePost('user/collection/group/create', body)
}

export const useAxiosPostDeleteCollectionGroup = undefined

export const useAxiosPostUpdateCollectionGroup = undefined

export const useAxiosPostAddCollectionToGroup = (body: collectionData) => {
    return usePost('user/collection/', body)
}

export const useAxiosCancelCollectionToGroup = (body: collectionData) => {
    return useDel('user/collection/', body)
}

export const useAxiosGetArticleCollectionState = (articleId: number) => {
    return useGet('user/collection/state', {
        sourceId: articleId,
        type: 'Article'
    })
}