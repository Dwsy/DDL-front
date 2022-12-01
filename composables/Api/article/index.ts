import http from '~~/utils/fetch'
import { useDel, useGet, useGetT, usePost } from '~/composables/useAxios'
import { collectionData, collectionGroupData, collectionType } from '~/types/article'
import { ResponseData, ResponsePageData } from '~/types/utils/axios'
import { PageParam } from '~/types/common'

export const useFetchGetArticleGroupList = (params?: { size?: number; page?: number }) => {
  return http.GET<ResponseData<any>>('article/group/list', params)
}

export const useFetchGetArticleList = (params?: {
  size?: number
  page?: number
  tagId?: string
  order?: string
  properties?: string
}) => {

  // clog('params', params)
  return http.GET<ResponsePageData<any>>('article/article/field/list', params)
}

export const useAxiosGetArticleList = (params?: {
  size?: number
  page?: number
  tagId?: string
  order?: string
  properties?: string
}) => {
  return useGet<ResponsePageData<any>>('article/article/field/list', params)
}

export const useFetchGetArticleField = (id) => {
  return http.GET<any>('article/article/field/' + id, null)
}

export const useFetchGetArticleContent = (id, params?: { type?: number }) => {
  return http.GET<any>('article/article/content/' + id, params)
}

//----
export const useFetchGetArticleComment = (id, params?: { size?: number; page?: number }) => {
  return http.GET<ResponsePageData<any>>('article/comment/' + id, params)
}
export const useAxiosGetArticleChildComment = (aid, pid, params?: PageParam) => {
  return useGet<ResponseData<any>>(`article/comment/child/${aid}-${pid}`, params)
}
export const useAxiosGetArticleComment = (id, params?: PageParam) => {
  return useGet<ResponseData<any>>('article/comment/' + id, params)
}

//----
export interface ReplyArticleCommentBody {
  articleFieldId: string
  parentCommentId: string
  replyUserId: string
  replyUserCommentId: string
  text: string
}

export const useAxiosPostReplyArticleComment = (body: ReplyArticleCommentBody) => {
  return usePost<ResponseData<any>>('article/comment', body)
}

//----
export interface ArticleCommentAction {
  actionCommentId: string
  actionUserId?: string
  articleFieldId: string
  commentType?: CommentType
}

export enum CommentType {
  comment,
  comment_comment,
  up,
  down,
  cancel,
  upToDown,
  downToUp,
}

export interface UserActionI {
  thumb?: number
  support?: number
  watch?: boolean
  collect: boolean
  follow: boolean
}

export const useAxiosGetArticleAction = (aid: string) => {
  return useGet<ResponseData<UserActionI>>('article/article/field/action/' + aid, null)
}

export const useAxiosPostActionArticleComment = (body: ArticleCommentAction) => {
  return usePost<ResponseData<any>>('article/comment/action', body)
}

//----

export const useFetchGetArticleTagListByGroupId = (
  id?,
  params?: { order?: string; properties?: string }
) => {
  return http.GET<ResponsePageData<any>>('article/tag/group/list/' + id, params)
}

export const useFetchGetArticleTagList = (params?: { order?: string; properties?: string }) => {
  return http.GET<ResponsePageData<any>>('article/tag/list/', params)
}

export const useAxiosGetCollectionGroupList = () => {
  return useGet<ResponseData<any>>('user/collection/group/list')
}

export const useAxiosGetCollectionGroupListT = () => {
  return useGetT<Array<collectionGroupData>>('user/collection/group/list')
}

// private String groupName
// private Long groupId
// private int order
export const useAxiosPostCreateCollectionGroup = (body: { groupName: string; order: number }) => {
  return usePost<ResponseData<any>>('user/collection/group/create', body)
}

export const useAxiosPostDeleteCollectionGroup = undefined

export const useAxiosPostUpdateCollectionGroup = undefined

export const useAxiosPostAddCollectionToGroup = (body: collectionData) => {
  return usePost<ResponseData<any>>('user/collection/', body)
}

export const useAxiosCancelCollectionToGroup = (body: collectionData) => {
  return useDel<ResponseData<any>>('user/collection/', body)
}

export const useAxiosGetArticleCollectionState = (articleId: string) => {
  return useGet<ResponseData<any>>('user/collection/state', {
    sourceId: articleId,
    type: 'Article',
  })
}

export const useAxiosDeleteCommentById = (articleId: string, commentId: string) => {
  return useDel<ResponseData<boolean>>(`article/comment/${articleId}/${commentId}`)
}
