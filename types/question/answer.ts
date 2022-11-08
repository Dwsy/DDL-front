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

export interface User0 extends User {
    userNickName: string
    avatar: string;
}


export interface ChildQaAnswers {
    id: string;
    deleted: boolean;
    createTime: number;
    lastModifiedTime: number;
    upNum: number;
    downNum: number;
    user: User;
    textHtml: string;
    textMd: string;
    textPure: any;
    parentUserId: string;
    parentAnswerId: string;
    replyUserAnswerId: string;
    answerSerialNumber: number;
    childQaAnswers: any;
    childQaAnswerNum: number;
    childQaAnswerTotalPages: number;
    userAction: any;
    answerType: string;
    ua: string;
}

export interface AnswerData {
    id: string;
    deleted: boolean;
    createTime: number;
    lastModifiedTime: number;
    upNum: number;
    downNum: number;
    user: User;
    textHtml: string;
    textMd: string;
    textPure: any;
    parentUserId: string;
    parentAnswerId: string;
    replyUserAnswerId: string;
    answerSerialNumber: number;
    childQaAnswers: Array<ChildQaAnswers>;
    childQaAnswerNum: number;
    childQaAnswerTotalPages: number;
    userAction: any;
    answerType: string;
    ua: string;
    accepted: boolean
}

export enum AnswerType {
    answer,

    answer_comment,//todo

    comment,

    comment_comment,

    up, down,

    cancel,

    upToDown,

    downToUp,

}