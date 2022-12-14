export interface NotifyMsg {
  id: string
  createTime: number
  lastModifiedTime: number
  fromUserId: string
  toUserId: string
  articleId: string
  commentId: string
  questionId: string
  answerId: string
  notifyType: NotifyType | NotifyTypeEn
  formContent: string
  toContent: string
  replyCommentId: string
  notifyState: NotifyState
  formUserAvatar: string
  formUserNickname: string

  infinityId: string
  replyInfinityId: any
}

export enum NotifyType {
  '评论了文章:',
  '回复了你的评论:',
  '点赞了你的文章:',
  '点赞了你的评论:',
  '提到了你:',
  '回答了你的问题:',
  '回复了你的问题:',
  '回复了你的回答:',
  '支持了你的问题:',
  '支持了你的回答:',
  '邀请回答问题',
  '被采纳',
  '回答 通知',
  '被采纳 通知',
  '点赞了你的动态',

  '回复了你的动态',

  '回复了你',

  '回复了你回复',
}

export enum NotifyTypeEn {
  comment_article,
  comment_article_comment,
  up_article,
  up_article_comment,
  at,
  answer,
  question_comment,
  answer_comment,
  up_question,
  up_question_answer,
  invitation_user_answer_question,
  accepted_question_answer,
  ///
  watch_answer,
  watch_accepted_question_answer,
  thumbTweet,

  comment_tweet,

  reply_comment_tweet,

  reply_reply_comment_tweet,
}

export enum NotifyState {
  /**
   * 未读  已读 删除
   */
  UNREAD,
  READ,
  DELETE,
}

export enum NotifyStateZh {
  '未读',
  '已读',
  '删除',
}
