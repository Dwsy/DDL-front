import {CreateArticleBody} from '~/types/article/manageArticle'
import {useGet, usePost, usePut} from '~/composables/useAxios'
import {ResponseData} from '~/types/utils/axios'
import {ContentType} from '~/composables/Api/article/manageArticle'
import {QuestionState} from '~/types/question'

export interface CreateQuestionBody {
    allow_answer?: boolean;
    codeHighlightStyle: string;
    codeHighlightStyleDark: string;
    content: string;
    markDownTheme: string;
    markDownThemeDark: string;
    questionGroupId: string;
    questionId?: string;
    questionState?: QuestionState;
    questionTagIds: any[];
    summary: string;
    title: string;
}


export const useAxiosPostAskQuestion = (body: CreateQuestionBody) => {
    return usePost<ResponseData<any>>('qa/question', body)
}

export const useAxiosPutUpdateAskQuestion = (body: CreateQuestionBody) => {
    return usePut<ResponseData<any>>('qa/question', body)
}


export const useAxiosGetQuestionContent = (id: string, type: ContentType, version: number) => {
    return useGet<ResponseData<string>>('qa/question/manage/content/' + id, {type, version})
}

export const useAxiosGetQuestionField = (id: string, version: number) => {
    return useGet<ResponseData<any>>('qa/question/manage/field/' + id, {version})
}

