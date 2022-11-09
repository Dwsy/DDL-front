import {AnswerData} from '~/types/question/answer'
import {User} from '~/types/user'


export interface QaGroup {
    id: string;
    name: string;
    info: string;
}

export interface QuestionTag {
    id: string;
    name: string;
    questionNum: number;
    weight: any;
    indexPageDisplay: boolean;
    tagInfo: string;
    qaGroup: QaGroup;
}

export interface Group {
    id: string;
    name: string;
    info: string;
}

export interface QuestionData {
    id: string;
    createTime: number;
    user: User;
    title: string;
    questionState: string;
    allowAnswer: boolean;
    answerNum: number;
    viewNum: number;
    collectNum: number;
    upNum: number;
    downNum: number;
    summary: string;
    questionTags: QuestionTag;
    codeHighlightStyle: string;
    markDownTheme: string;
    codeHighlightStyleDark: string;
    markDownThemeDark: string;
    group: Group;
}


export interface QuestionField {
    id: string;
    createTime: number;
    lastModifiedTime: number;
    user: User;
    title: string;
    questionState: string;
    allowAnswer: boolean;
    answerNum: number;
    viewNum: number;
    collectNum: number;
    upNum: number;
    downNum: number;
    summary: string;
    questionTags: QuestionTag;
    codeHighlightStyle: string;
    markDownTheme: string;
    codeHighlightStyleDark: string;
    markDownThemeDark: string;
    group: Group;
    questionCommentList: AnswerData[];
    questionCommentNum: number;
    questionCommentTotalPages: number
}

export enum QuestionState {
    ASK,
    HAVE_ANSWER,
    RESOLVED,
    UNRESOLVED,
    HIDE,
    AUDITING,
    REJECTED
}