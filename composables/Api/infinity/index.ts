import { useDel, useGet, usePost } from '~/composables/useAxios'
import { ResponseData, ResponsePageData } from "~/types/utils/axios";
import { InfinityI, InfinityTopic } from "~/types/infinity";

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
  content: string;
  imgUrlList: any[];
  infinityClubId?: string;
  infinityTopicIds?: string[];
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

export const useAxiosGetInfinityTopicList = () => {
  return useGet<ResponsePageData<InfinityTopic>>(`infinity/topic/list`)
}