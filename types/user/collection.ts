export interface collectionGroup {
    id: string;
    string: number;
    groupName: string;
    collectionNum: number;
    groupOrder: number;
    introduction: string;
    createTime: number
}

export interface UserCollection {
    id: string;
    userId: string;
    collectionType: CollectionType;
    sourceId: string;
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
