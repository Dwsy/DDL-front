export interface UserInfo {
    id: string;
    avatar: string;
    sign: string;
    gender: string;
    birth: number;
    level: number;
}

export interface User {
    id: string;
    nickname: string;
    userInfo: UserInfo;
    level: number;
    following: boolean;
}

export interface QaGroup {
    id: string;
    name: string;
    info: string;
}

export interface QuestionTags {
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
    questionTags: QuestionTags;
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
    questionTags: QuestionTags;
    codeHighlightStyle: string;
    markDownTheme: string;
    codeHighlightStyleDark: string;
    markDownThemeDark: string;
    group: Group;
}