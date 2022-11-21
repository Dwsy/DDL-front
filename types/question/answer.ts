import {User} from '~/types/user'

export interface User0 extends User {
    userNickName: string;
    avatar: string;
    userId: string;
    invited: boolean;
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
    accepted: boolean;
    acceptedTime: number;
}

export enum AnswerType {
    answer,

    answer_comment, //todo

    comment,

    comment_comment,

    up,
    down,

    cancel,

    upToDown,

    downToUp,
}
