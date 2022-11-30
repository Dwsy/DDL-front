import http from '~~/utils/fetch'
import { useDel, useGet, useGetT, usePost } from '~/composables/useAxios'
import { ResponseData } from '~/types/utils/axios'
import { PageParam } from '~/types/common'
import { AnswerData, AnswerType } from '~/types/question/answer'

export const useAxiosGetQuestionAnswerPageList = (questionId: string, param: PageParam) => {
  return useGet<ResponseData<any>>(`qa/answer/${questionId}`, param)
}

export const useAxiosPostAnswerQuestion = (body: AnswerQuestionRB) => {
  return usePost<ResponseData<AnswerData>>('qa/answer', body)
}

export const userAxiosPostInvitationUserAnswerQuestion = (body: InvitationUserAnswerQuestionRB) => {
  return usePost<ResponseData<any>>('qa/answer/invitation', body)
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
  return usePost<ResponseData<AnswerType>>('qa/answer/action', body)
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

export const userAxiosGetAcceptAnswer = (answerId: string, accepted: boolean) => {
  return useGet<ResponseData<boolean>>('qa/answer/accept', {
    answerId,
    accepted,
  })
}
