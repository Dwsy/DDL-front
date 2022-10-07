export interface articleListData {
    banner: string;
    summary: string;
    articleState: string;
    title: string;
    user: User;
    allowComment: boolean;
    viewNum: number;
    collectNum: number;
    articleTags: ArticleTag[];
    articleGroup: ArticleGroup;
    id: string;
    createTime: String;
}

export interface UserInfo {
    avatarNew?: string
    id: number;
    avatar: string;
    sign: string;
    gender: string;
    birth?: any;
}

export interface User {
    id: number;
    nickname: string;
    userInfo: UserInfo;
    level: number;
}

export interface ArticleTag {
    id: number;
    name: string;
    articleNum: number;
    tagInfo: string;
}

export interface ArticleGroup {
    id: number;
    name: string;
    info: string;
    articleNum: number;
}
