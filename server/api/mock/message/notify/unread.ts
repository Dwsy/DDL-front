import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  return unread
})
const unread = {
  code: 0,
  msg: '',
  data: {
    unreadNotifyCount: 0,
    unreadNotifyReplyCommentCount: 0,
    unreadNotifyArticleOrCommentThumbCount: 0,
    unreadNotifyQuestionOrAnswerThumbCount: 0,
    unreadNotifyAnswerCount: 0,
    unreadNotifyAnswerCommentCount: 0,
    unreadNotifyQuestionCommentCount: 0,
    unreadPrivateMessageCount: 0,
    unreadSystemMessageCount: 0,
    unreadAtMeCount: 0,
    unreadInvitationAnswerCount: 0,
    unreadAcceptedAnswerCount: 0,
    unreadWatchAnswer: 0,
    unreadWatchAcceptedQuestionAnswer: 0,
  },
}
