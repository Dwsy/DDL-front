import { User } from '~/types/user'

export interface InfinityTopic {
  id: string
  createTime: number
  name: string
  description: string
  notice: string
  cover: string
  viewNum: number
  infinityNum: number
  followerNum: number
}

export interface InfinityClub {
  id: string
  createTime: number
  name: string
  description: string
  cover: string
  notice: string
  viewNum: number
  infinityNum: number
  followerNum: number
}

export interface InfinityI {
  id: string
  createTime: number
  user: User
  content: string
  type: string
  upNum: number
  viewNum: number
  collectNum: number
  refId: string
  ua: any
  infinityTopics: InfinityTopic[]
  infinityClub: InfinityClub
  parentUserId: string
  parentTweetId: any
  replyUserTweetId: string
  replySerialNumber: number
  up: boolean
  parentUser: any
  childComments: InfinityI[]
  childCommentReplyMap: Map<string, InfinityI[]>
  childCommentNum: number
  childCommentTotalPages: number
  imgUrlList: string[]
}
