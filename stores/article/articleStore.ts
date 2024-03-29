import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'
import { CommentType, useAxiosPostActionArticleComment } from '#imports'
import { themes, changeThemes } from '~~/constant/markdownThemeList'
import { HighlightStyleName, changeHighlightStyle } from '~~/constant/highlightStyleList'
import { UserActionI, useAxiosGetArticleAction } from '~/composables/Api/article'
import { ArticleSource, ArticleState } from '~/types/article/manageArticle'
import { MarkdownThemeNameList, mwebDark } from '~/types/other/markdownTheme'

export const useArticleStore = defineStore('ArticleStore', {
  state: (): Iarticle => ({
    articleField: null,
    contentHtml: null,
    // mdThemeNameList: ['cyanosis', 'smart-blue', 'juejin', 'devui-blue', 'v-green', 'arknights'],
    // mdThemeNameListDark: ['geek-black'],
    // markdownTheme: null,
    markdownThemeLight: null,
    markdownThemeDark: null,
    codeHighlightStyleDark: null,
    codeHighlightStyleLight: null,
    follow: false,
    collect: false,
    thumb: 0,
    loading: true,
    HighlightStyleStr: '',
    MarkdownThemeStr: '',
  }),
  getters: {},
  actions: {
    async init() {
      // clog(this.articleField.markDownTheme)
      // if (this.articleField.markDownTheme !== undefined) {
      //     await this.changeThemeLight(this.articleField.markDownTheme)
      // } else {
      //     await this.changeThemeLight()
      // }
      this.codeHighlightStyleLight = this.articleField.codeHighlightStyle
      this.codeHighlightStyleDark = this.articleField.codeHighlightStyleDark

      this.markdownThemeLight = this.articleField.markDownTheme
      this.markdownThemeDark = this.articleField.markDownThemeDark
      // this.markdownThemeDark
      let { data: response } = await useAxiosGetArticleAction(this.articleField.id)
      this.thumb = response.data.thumb
      this.follow = response.data.follow
      this.collect = response.data.collect
      this.loading = false
      // await changeHighlightStyle(this.articleField.codeHighlightStyle)
    },
    async changeThemeDark() {
      if (this.markdownThemeDark === null) {
        await changeThemes(themes.geekBlack)
      } else {
        await changeThemes(themes[this.markdownThemeDark])
      }
      this.loading = false
    },
    async changeThemeLight() {
      if (this.markdownThemeLight === null) {
        await changeThemes(themes.cyanosis)
      } else {
        await changeThemes(themes[this.markdownThemeLight])
      }
      this.loading = false
    },
    async changeHighlightStyleLight() {
      if (this.codeHighlightStyleLight === null) {
        await changeHighlightStyle('github')
      } else {
        await changeHighlightStyle(this.codeHighlightStyleLight)
      }
    },
    async changeHighlightStyleDark() {
      if (this.codeHighlightStyleDark === null) {
        await changeHighlightStyle('monokai')
      } else {
        await changeHighlightStyle(this.codeHighlightStyleDark)
      }
    },
    async ActionArticle(commentType: CommentType) {
      const body = {
        actionCommentId: '-1', //-1代表对文章的操作
        articleFieldId: this.articleField.id,
        commentType: commentType,
      }
      let { data: actionData } = await useAxiosPostActionArticleComment(body)
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
    },
  },
})

interface Iarticle extends UserActionI {
  articleField: Ref<ArticleField>
  contentHtml: string
  // mdThemeNameList: Array<string>
  // mdThemeNameListDark: Array<string>
  // markdownTheme: string
  markdownThemeDark: string
  markdownThemeLight: string
  codeHighlightStyleDark: string
  codeHighlightStyleLight: string
  thumb: CommentType
  collect: boolean
  follow: boolean
  loading: boolean
  HighlightStyleStr: string
  MarkdownThemeStr: string
}

interface UserInfo {
  id: string
  avatar: string
  sign: string
  gender: string
  birth: any
}

interface User {
  id: string
  nickname: string
  userInfo: UserInfo
  level: number
}

interface ArticleTags {
  id: string
  name: string
  articleNum: number
  weight: number
  indexPageDisplay: boolean
  tagInfo: string
}

interface ArticleGroup {
  id: string
  name: string
  info: string
  articleNum: number
}

export interface ArticleField {
  id: string
  createTime: number
  lastModifiedTime: number
  user: User
  title: string
  summary: string
  articleState: ArticleState
  allowComment: boolean
  viewNum: number
  collectNum: number
  upNum: number
  downNum: number
  banner: string
  articleTags: ArticleTags[]
  articleGroup: ArticleGroup
  //自定义
  thumb: CommentType
  collect: boolean
  articleSource: ArticleSource
  articleSourceUrl: string
  markDownTheme: string | MarkdownThemeNameList
  markDownThemeDark: mwebDark | string
  codeHighlightStyle: HighlightStyleName | string
  // follow: boolean
}

//--
interface UserInfo {
  id: string
  avatar: string
  sign: string
  gender: string
  birth: any
}

// interface CommentContent {
//     id: string
//     deleted: boolean
//     createTime: number
//     lastModifiedTime: number
//     user: User
//     text: string
//     upNum: number
//     downNum: number
//     parentUserId: number
//     parentCommentId: number
//     parentUser: any
//     childComments: CommentContent[]
//     ua: string
//     showCommentBox: boolean
//     userAction: commentType
//     replyCommentText: any
//     // fixme ref 2层不需要value然后极会报错 ？ 先用any了
// }
