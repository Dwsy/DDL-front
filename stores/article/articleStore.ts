import {ref, Ref} from 'vue'
import {defineStore} from 'pinia'
import {
    CommentType,
    useAxiosGetArticleComment,
    useAxiosPostActionArticleComment,
    useAxiosPostReplyArticleComment,
    useFetchGetArticleContent,
    useFetchGetArticleField
} from '#imports'
import {useRoute} from '#imports'
import {ArticleAction, useAxiosGetArticleAction} from '~/composables/Api/article'
import {ArticleSource} from '~/types/article/manageArticle'


export const useArticleStore = defineStore('ArticleStore', {
    state: (): Iarticle => ({
        articleField: null,
        contentHtml: null,
        mdThemeNameList: ['cyanosis', 'smart-blue', 'juejin', 'devui-blue', 'v-green', 'arknights'],
        mdThemeNameListDark: ['geek-black'],
        markdownTheme: null,
        markdownThemeLight: '',
        markdownThemeDark: '',
        follow: false,
        collect: false,
        thumb: 0
    }),
    getters: {},
    actions: {
        async init() {
            if (this.articleField.markdownTheme !== undefined) {
                this.getMarkdownThemeName(this.articleField.markdownTheme)
            } else {
                this.getMarkdownThemeName()
            }
            let {data: response} = await useAxiosGetArticleAction(this.articleField.id)
            this.thumb = response.data.thumb
            //todo 收藏
            this.follow = response.data.follow
            this.collect = response.data.collect
        },
        getMarkdownThemeName(index?: number) {
            if (index !== undefined) {
                // this.markdownTheme = 'markdown-body-' + this.mdThemeNameList[index]
                this.markdownThemeLight = 'markdown-body-' + this.mdThemeNameList[index]
                this.markdownThemeDark = 'markdown-body-' + this.mdThemeNameListDark[index]

            } else {
                // this.markdownTheme = 'markdown-body-' + this.mdThemeNameList[Math.ceil(Math.random() * this.mdThemeNameList.length) - 1]
                this.markdownThemeLight = 'markdown-body-' + this.mdThemeNameList[Math.ceil(Math.random() * this.mdThemeNameList.length) - 1]
                this.markdownThemeDark = 'markdown-body-' +
                    this.mdThemeNameListDark[Math.ceil(Math.random() * Math.max(1, this.mdThemeNameListDark.length)) - 1]
            }
            console.log('this.markdownThemeLight', this.markdownThemeLight)
            console.log('this.markdownThemeDark', this.markdownThemeDark)

        },
        async ActionArticle(commentType: CommentType) {
            const body = {
                actionCommentId: '-1',//-1代表对文章的操作
                articleFieldId: this.articleField.id,
                commentType: commentType,
            }
            let {data: actionData} = await useAxiosPostActionArticleComment(body)
            if (actionData.code !== 0) {
                alert(actionData.msg)
                return
            }
            let retType: CommentType = actionData.data
            switch (retType) {
                case CommentType.up:
                    this.articleField.upNum++
                    this.thumb = CommentType.up
                    break
                case CommentType.down:
                    this.articleField.downNum++
                    this.thumb = CommentType.down
                    break
                case CommentType.upToDown:
                    this.articleField.upNum--
                    this.articleField.downNum++
                    this.thumb = CommentType.down
                    break
                case CommentType.downToUp:
                    this.articleField.upNum++
                    this.articleField.downNum--
                    this.thumb = CommentType.up
                    break
                case CommentType.comment:
                    break
                case CommentType.comment_comment:
                    break
                case CommentType.cancel:
                    if (commentType === CommentType.up) {
                        this.articleField.upNum--
                        this.thumb = CommentType.cancel
                    } else {
                        this.articleField.downNum--
                        this.thumb = CommentType.cancel
                    }
                    break
            }
            this.articleField.upNum = Math.max(this.articleField.upNum, 0)
            this.articleField.downNum = Math.max(this.articleField.downNum, 0)
        },
        getArticleActionIcon(action: CommentType) {
            if (this.thumb === action) {
                if (action === CommentType.up) {
                    return 'mdi-thumb-up'
                } else {
                    return 'mdi-thumb-down'
                }
            } else {
                if (action === CommentType.up) {
                    return 'mdi-thumb-up-outline'
                } else {
                    return 'mdi-thumb-down-outline'
                }
            }
        }

    }
})

interface Iarticle extends ArticleAction {
    articleField: Ref<ArticleField>
    contentHtml: string
    mdThemeNameList: Array<string>
    mdThemeNameListDark: Array<string>
    markdownTheme: string
    markdownThemeDark: string
    markdownThemeLight: string
    thumb: CommentType;
    collect: boolean;
    follow: boolean;
}


interface UserInfo {
    id: string;
    avatar: string;
    sign: string;
    gender: string;
    birth: any;
}

interface User {
    id: string;
    nickname: string;
    userInfo: UserInfo;
    level: number;
}

interface ArticleTags {
    id: string;
    name: string;
    articleNum: number;
    weight: number;
    indexPageDisplay: boolean;
    tagInfo: string;
}

interface ArticleGroup {
    id: string;
    name: string;
    info: string;
    articleNum: number;
}

export interface ArticleField {
    id: string;
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
    articleTags: ArticleTags[];
    articleGroup: ArticleGroup;
    //自定义
    thumb: CommentType;
    collect: boolean;
    articleSource: ArticleSource;
    articleSourceUrl: string
    // follow: boolean;
}

//--
interface UserInfo {
    id: string;
    avatar: string;
    sign: string;
    gender: string;
    birth: any;
}


// interface CommentContent {
//     id: string;
//     deleted: boolean;
//     createTime: number;
//     lastModifiedTime: number;
//     user: User;
//     text: string;
//     upNum: number;
//     downNum: number;
//     parentUserId: number;
//     parentCommentId: number;
//     parentUser: any;
//     childComments: CommentContent[];
//     ua: string;
//     showCommentBox: boolean;
//     userAction: commentType;
//     replyCommentText: any
//     // fixme ref 2层不需要value然后极会报错 ？ 先用any了
// }