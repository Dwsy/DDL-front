import http from '~~/utils/fetch'
import { useGet, usePost } from '~/composables/useAxios'
import { ResponseData, ResponsePageData } from '~/types/utils/axios'
import { InfinityI } from '~/types/infinity'
import { UserActiveTypeEn } from '~/types/user/active'

export const useAxiosGetUserInfo = () => {
  return useGet<ResponseData<any>>('user/info', null, true)
}
export const useAxiosGetUserInfoByUid = (uid: string) => {
  return useGet<ResponseData<any>>('user/info/' + uid)
}

export const useAxiosPostCheck = () => {
  return usePost<ResponseData<string>>('user/active/check')
}

export const useAxiosGetArticleListByUserId = (
  userId,
  params?: {
    size?: number
    page?: number
    tagId?: string
    order?: string
    properties?: string
  }
) => {
  return useGet<ResponseData<any>>('article/article/field/list/' + userId, params)
}

export const useAxiosGetUserThumbActiveListByUserId = (
  userId,
  params?: {
    size?: number
    page?: number
    tagId?: string
    order?: string
    properties?: string
    type: UserActiveTypeEn
  }
) => {
  return useGet<ResponseData<any>>('user/active/thumb/' + userId, params)
}

export enum UserActiveType {
  Check_In, //签到

  Browse_Article, //浏览文章

  Browse_QA, //浏览问题
  //-------------

  Comment_Article, //评论文章

  Comment_Article_Comment, //评论文章评论

  UP_Article, //点赞文章

  UP_Article_Comment, //点赞文章评论

  Answer_Question, //回答问题 or 问题回答

  UP_Question, //点赞问题

  UP_Question_Answer, //点赞问题回答
  Accepted_Question_Answer, //采纳问题回答

  Comment_Tweet, //回复推文

  Reply_Comment_Tweet, //回复推文回复

  Reply_Reply_Comment_Tweet, //回复推文二级回复

  Thumb_Tweet, //点赞tweet
}

export const useAxiosGetUserDynamic = (
  userId: string,
  params?: {
    size?: number
    page?: number
    order?: string
  }
) => {
  return useGet<ResponsePageData<InfinityI>>('/infinity/infinity/user/' + userId, params)
}
