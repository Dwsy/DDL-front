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

export interface collectionGroupData {
    id: number;
    userId: number;
    groupName: string;
    collectionNum: number;
    groupOrder: number;
    select: boolean
}

// public class UserCollectionRB {
//     @NotNull(message = "收藏分组不能为空")
//     private Long groupId;
//     @NotNull(message = "收藏内容不能为空")
//     private Long sourceId;
//     @NotNull(message = "收藏类型不能为空")
//     private CollectionType collectionType;
// }
export interface collectionData {
    groupId: number
    sourceId: number
    collectionType: collectionType
}

export enum collectionType {
    Article,
    Question,
    Comment,
    Answer,
}