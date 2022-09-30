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
import {useAxiosGetArticleAction} from '~/composables/Api/article'


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
            this.articleField.thumb = response.data.thumb
            //todo 收藏
            this.follow = response.data.follow
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
        async ActionArticle(CommentType: commentType) {
            const body = {
                actionCommentId: -1,//-1代表对文章的操作
                articleFieldId: this.articleField.id,
                commentType: CommentType,
            }
            let {data: actionData} = await useAxiosPostActionArticleComment(body)
            if (actionData.code !== 0) {
                alert(actionData.msg)
                return
            }
            let retType: commentType = actionData.data
            switch (retType) {
                case commentType.up:
                    this.articleField.upNum++
                    this.articleField.thumb = commentType.up
                    break
                case commentType.down:
                    this.articleField.downNum++
                    this.articleField.thumb = commentType.down
                    break
                case commentType.upToDown:
                    this.articleField.upNum--
                    this.articleField.downNum++
                    this.articleField.thumb = commentType.down
                    break
                case commentType.downToUp:
                    this.articleField.upNum++
                    this.articleField.downNum--
                    this.articleField.thumb = commentType.up
                    break
                case commentType.comment:
                    break
                case commentType.comment_comment:
                    break
                case commentType.cancel:
                    if (CommentType === commentType.up) {
                        this.articleField.upNum--
                        this.articleField.thumb = commentType.cancel
                    } else {
                        this.articleField.downNum--
                        this.articleField.thumb = commentType.cancel
                    }
                    break
            }
            this.articleField.upNum = Math.max(this.articleField.upNum, 0)
            this.articleField.downNum = Math.max(this.articleField.downNum, 0)
        },
        getArticleActionIcon(action: commentType) {
            if (this.articleField.thumb === action) {
                if (action === commentType.up) {
                    return 'mdi-thumb-up'
                } else {
                    return 'mdi-thumb-down'
                }
            } else {
                if (action === commentType.up) {
                    return 'mdi-thumb-up-outline'
                } else {
                    return 'mdi-thumb-down-outline'
                }
            }
        }

    }
})

interface Iarticle {
    articleField: Ref<ArticleField>
    contentHtml: string
    mdThemeNameList: Array<string>
    mdThemeNameListDark: Array<string>
    markdownTheme: string
    markdownThemeDark: string
    markdownThemeLight: string
    follow: boolean

}


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
    //自定义
    thumb: commentType;
    collect: boolean;
    // follow: boolean;
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