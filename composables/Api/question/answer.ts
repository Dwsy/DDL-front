import http from '~~/utils/fetch'
import {useDel, useGet, useGetT, usePost} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'
import {PageParam} from '~/types/common'
import {AnswerType} from '~/types/question/answer'

export const useAxiosGetQuestionAnswerPageList = (questionId: string, param: PageParam) => {
    return useGet<ResponseData<any>>(`/qa/answer/${questionId}`, param)
}

export const useAxiosPostAnswerQuestion = (body: AnswerQuestionRB) => {
    return usePost<ResponseData<string>>('/qa/answer', body)
}

export interface AnswerQuestionRB {
    mdText: string;
    parentAnswerId: string;
    questionId: string;
    replyUserAnswerId: string;
    replyUserId: string;
}

export const useAxiosPostQaAction = (body: QaActionRB) => {
    return usePost<ResponseData<AnswerType>>('/qa/answer/action', body)
}

export interface QaActionRB {
    actionAnswerOrCommentId: string;
    actionUserId?: string;
    answerType: AnswerType;
    questionFieldId: string;
}



