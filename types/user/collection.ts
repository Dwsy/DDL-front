export interface collectionGroup {
    id: number;
    userId: number;
    groupName: string;
    collectionNum: number;
    groupOrder: number;
    introduction: string;
    createTime: number
}

export interface UserCollection {
    id: number;
    userId: number;
    collectionType: CollectionType;
    sourceId: number;
    sourceTitle: string;
    createTime: number
}

export interface getCollectionListByGroupIdParams {
    page?: number,
    size?: number,
    order?: string,
    properties?: string,
    CollectionType?: CollectionType
}

export enum CollectionType {
    Article = 'Article',
    Question = 'Question',
    Comment = 'Comment',
    Answer = 'Answer',
}

export enum CollectionTypeZh {
    Article = '文章',
    Question = '问题',
    Comment = '评论',
    Answer = '回答',
}
