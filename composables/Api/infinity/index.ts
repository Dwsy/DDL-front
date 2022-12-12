import { useDel, useGet, usePost } from '~/composables/useAxios'
import { PageData, ResponseData, ResponsePageData } from '~/types/utils/axios'
import { InfinityI, InfinityTopic } from '~/types/infinity'

export interface GetInfinityPageListParams {
  order?: string
  properties?: string[]
  size?: number
  page?: number
  clubId?: string
  topicId?: string
}

export const useAxiosGetInfinityPageList = (params: GetInfinityPageListParams) => {
  return useGet<ResponsePageData<InfinityI>>('infinity/infinity/list', params)
}

export const useAxiosPostActionUpInfinity = (tweetId: string, up: boolean) => {
  return usePost<ResponseData<string>>(`infinity/infinity/action/up/${tweetId}?up=${up}`)
}

export interface SendInfinityRB {
  content: string
  imgUrlList: any[]
  infinityClubId?: string
  infinityTopicIds?: string[]
  refId?: number
  type: InfinityType
}

export enum InfinityType {
  Tweet,

  upTweet,

  TweetReply,

  Article,

  Question,

  Answer,
}

export const useAxiosPostSendInfinity = (data: SendInfinityRB) => {
  return usePost<ResponseData<InfinityI>>('infinity/infinity', data)
}

export interface ReplyInfinityRB {
  content: string
  replyId: string
  replyUserId?: string
  replyUserTweetId?: string
  imgUrlList?: string[]
  refId?: string
}

export const useAxiosPostReplyInfinity = (data: ReplyInfinityRB) => {
  return usePost<ResponseData<InfinityI>>('infinity/infinity/comment', data)
}

export const useAxiosGetInfinityTopicList = () => {
  return useGet<ResponsePageData<InfinityTopic>>(`infinity/topic/list`)
}

export const useAxiosGetInfinityTopicSearchSug = (query: string) => {
  return useGet<ResponseData<InfinityTopic[]>>('search/infinity/topic/' + query)
}

export interface InfinityTopicRankI {
  id: string
  name: string
  description: any
  viewNum: number
  infinityNum: number
  followerNum: number
  scoreCount: number
}

export const useAxiosGetToDayHotTopicList = () => {
  return useGet<ResponseData<InfinityTopic[] | InfinityTopicRankI[]>>(`data/rank/infinity/topic`)
}

export const useAxiosGetInfinityById = (id: string) => {
  return useGet<ResponseData<InfinityI>>(`infinity/infinity/${id}`)
}

interface CommentAndReplyData {
  childComments: PageData<InfinityI>
  commentReplyMap: Map<string, InfinityI[]>
}

export const useAxiosGetInfinityCommentById = (id: string, params: GetInfinityPageListParams) => {
  return useGet<ResponseData<CommentAndReplyData>>('infinity/infinity/comment/' + id, params)
  // return useGet<ResponsePageData<InfinityI>>('http://localhost:7088/infinity/childComments/'+id, params)
}
