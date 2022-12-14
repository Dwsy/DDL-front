import http from '~~/utils/fetch'
import { useDel, useGet, useGetT, usePost } from '~/composables/useAxios'
import { ResponseData, ResponsePageData } from '~/types/utils/axios'
import { PageParam } from '~/types/common'
import { AnswerData, AnswerType, InvitedUserI } from '~/types/question/answer'

export const useAxiosGetQuestionAnswerPageList = (questionId: string, param: PageParam) => {
  return useGet<ResponseData<any>>(`question/answer/${questionId}`, param)
}

export const useAxiosPostAnswerQuestion = (body: AnswerQuestionRB) => {
  return usePost<ResponseData<AnswerData>>('question/answer', body)
}

export const useAxiosPostInvitationUserAnswerQuestion = (body: InvitationUserAnswerQuestionRB) => {
  return usePost<ResponseData<any>>('question/answer/invitation', body)
}

export interface AnswerQuestionRB {
  mdText: string
  parentAnswerId: string
  questionId: string
  replyUserAnswerId?: string
  replyUserId?: string
  answerType: AnswerType
}

export const useAxiosPostQaAction = (body: QaActionRB) => {
  return usePost<ResponseData<AnswerType>>('question/answer/action', body)
}

export interface QaActionRB {
  actionAnswerOrCommentId: string
  actionUserId?: string
  answerType: AnswerType
  questionFieldId: string
}

export interface InvitationUserAnswerQuestionRB {
  questionId: string
  userId: string
  cancel: boolean
}

export const useAxiosGetAcceptAnswer = (answerId: string, accepted: boolean) => {
  return useGet<ResponseData<boolean>>('question/answer/accept', {
    answerId,
    accepted,
  })
}

export const useAxiosGetUserFollowingListAndInvitationState = (
  questionId: string,
  params: PageParam
) => {
  return useGet<ResponsePageData<InvitedUserI>>(
    'question/answer/invitation/following/' + questionId,
    params
  )
}

export const useAxiosGetUserFollowerListAndInvitationState = (
  questionId: string,
  params: PageParam
) => {
  return useGet<ResponsePageData<InvitedUserI>>(
    'question/answer/invitation/follower/' + questionId,
    params
  )
}

export const useAxiosPostRecommendedUserListAndInvitationState = (questionId: string, tagIds) => {
  return usePost<ResponseData<InvitedUserI[]>>(
    'question/answer/invitation/recommended/' + questionId,
    tagIds
  )
}
