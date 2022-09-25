import {ref, Ref} from 'vue'
import {defineStore} from 'pinia'
import {
    commentType,
    useAxiosGetArticleComment,
    useAxiosPostActionArticleComment,
    useAxiosPostReplyArticleComment,
    useFetchGetArticleContent,
    useFetchGetArticleField
} from '#imports'
import {useRoute} from '#imports'


export const useArticleStore = defineStore('ArticleStore', {
    state: (): Iarticle => ({
        articleField: null,
        contentHtml: null,
        // commentList: [],
    }),
    getters: {},
    actions: {
        async init(aid) {

        },

    },

})

interface Iarticle {
    articleField: Ref<ArticleField>;
    contentHtml: string;
    // commentList: CommentContent[];
}

// interface Iarticle{
//     articleField:Ref<ArticleField>;
//     contentHtml:Ref<string>;
//     // commentList:Ref<CommentContent[]>;
// }

interface UserInfo {
    id: number;
    avatar: string;
    sign: string;
    gender: string;
    birth: any;
}

interface User {
    id: number;
    nickname: string;
    userInfo: UserInfo;
    level: number;
}

interface ArticleTags {
    id: number;
    name: string;
    articleNum: number;
    tagInfo: string;
}

interface ArticleGroup {
    id: number;
    name: string;
    info: string;
    articleNum: number;
}

export interface ArticleField {
    id: number;
    createTime: number;
    lastModifiedTime: number;
    user: User;
    title: string;
    summary: string;
    articleState: string;
    allowComment: boolean;
    viewNum: number;
    collectNum: number;
    upNum: number;
    downNum: number;
    banner: string;
    articleTags: ArticleTags;
    articleGroup: ArticleGroup;
}

//--
interface UserInfo {
    id: number;
    avatar: string;
    sign: string;
    gender: string;
    birth: any;
}


interface CommentContent {
    id: number;
    deleted: boolean;
    createTime: number;
    lastModifiedTime: number;
    user: User;
    text: string;
    upNum: number;
    downNum: number;
    parentUserId: number;
    parentCommentId: number;
    parentUser: any;
    childComments: CommentContent[];
    ua: string;
    showCommentBox: boolean;
    userAction: commentType;
    replyCommentText: any
    // fixme ref 2层不需要value然后极会报错 ？ 先用any了
}