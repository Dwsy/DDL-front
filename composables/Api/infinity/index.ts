import { useDel, useGet, usePost } from '~/composables/useAxios'
import { ResponseData } from '~/types/utils/axios'
import { InfinityI } from '~/types/infinity'

export interface GetInfinityPageListParams {
  order?: string
  properties?: string[]
  size?: number
  page?: number
  clubId?: string
  topicId?: string
}

export const useAxiosGetInfinityPageList = (params: GetInfinityPageListParams) => {
  return useGet<ResponseData<InfinityI>>('infinity/infinity/list', params)
}

export const useAxiosPostActionUpInfinity = (tweetId: string, up: boolean) => {
  return usePost<ResponseData<string>>(`infinity/infinity/action/up/${tweetId}?up=${up}`)
}

export interface SendInfinityRB {
  content: string;
  imgUrlList: any[];
  infinityClubId?: number;
  infinityTopicId?: number;
  refId?: number;
  type: InfinityType;
}

export enum InfinityType {
  Tweet,

  upTweet,

  TweetReply,

  Article,

  Question,

  Answer,
}

export const useAxiosPostSendInfinity = (data:SendInfinityRB) => {
  return usePost<ResponseData<InfinityI>>('infinity/infinity',data)
}