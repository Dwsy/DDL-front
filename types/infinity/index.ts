import { User } from '~/types/user'

interface InfinityTopic {
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

interface InfinityClub {
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
  collectNum: number
  refId: string
  ua: any
  infinityTopic: InfinityTopic
  infinityClub: InfinityClub
  parentUserId: string
  parentTweetId: any
  replyUserTweetId: string
  replySerialNumber: number
  up: boolean
  parentUser: any
  childComments: any[]
  childCommentNum: number
  childCommentTotalPages: number
  imgUrlList: string[]
}