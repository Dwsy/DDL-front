import {User} from '~/types/user'

export interface articleListData {
    banner: string
    summary: string
    articleState: string
    title: string
    user: User
    allowComment: boolean
    viewNum: number
    collectNum: number
    articleTags: ArticleTag[]
    articleGroup: ArticleGroup
    id: string
    createTime: String
    lastModifiedTime: string
    commentNum: number
}


export interface ArticleTag {
    id: string
    name: string
    articleNum: number
    weight: number
    indexPageDisplay: boolean
    tagInfo: string
}

export interface ArticleGroup {
    id: string
    name: string
    info: string
    articleNum: number
}

export interface collectionGroupData {
    id: string
    userId: string
    groupName: string
    collectionNum: number
    groupOrder: number
    select: boolean
}

// public class UserCollectionRB {
//     @NotNull(message = "收藏分组不能为空")
//     private Long groupId
//     @NotNull(message = "收藏内容不能为空")
//     private Long sourceId
//     @NotNull(message = "收藏类型不能为空")
//     private CollectionType collectionType
// }
export interface collectionData {
    groupId: string
    sourceId: string
    collectionType: collectionType
}

export enum collectionType {
    Article,
    Question,
    Comment,
    Answer,
}