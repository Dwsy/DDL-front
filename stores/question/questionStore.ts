import {defineStore} from 'pinia'
import {QuestionField} from '~/types/question'
import {changeThemes, themes} from '~/constant/markdownThemeList'
import {changeHighlightStyle} from '~/constant/highlightStyleList'
import {AnswerType} from '~/types/question/answer'
import {UserActionI} from '~/composables/Api/article'
import {useAxiosGetUserToQuestionAction} from '~/composables/Api/question'

interface QuestionStore extends UserActionI {
    filed: QuestionField;
    content: string;
    cookieThemeState: string;
    markdownThemeDark: string;
    markdownThemeLight: string;
    codeHighlightStyleDark: string;
    codeHighlightStyleLight: string;

    HighlightStyleStr: string;
    MarkdownThemeStr: string;
    watch: boolean;
}

export const useQuestionStore = defineStore('QuestionStore', {
    state: (): QuestionStore => ({
        filed: null,
        content: null,
        cookieThemeState: '',
        markdownThemeLight: null,
        markdownThemeDark: null,
        codeHighlightStyleDark: null,
        codeHighlightStyleLight: null,
        collect: false,
        follow: false,
        support: 0,
        watch: false,
        HighlightStyleStr: '',
        MarkdownThemeStr: '',
    }),
    actions: {
        async init(questionId: string) {
            this.markdownThemeDark = this.filed.markDownThemeDark
            this.markdownThemeLight = this.filed.markDownTheme
            this.codeHighlightStyleDark = this.filed.codeHighlightStyleDark
            this.codeHighlightStyleLight = this.filed.codeHighlightStyle
        },
        async getUserToQuestionAction(questionId: string) {
            const {data: axiosResponse} = await useAxiosGetUserToQuestionAction(
                questionId
            )
            if (axiosResponse.code == 0) {
                this.collect = axiosResponse.data.collect
                this.follow = axiosResponse.data.follow
                this.support = axiosResponse.data.support
                this.watch = axiosResponse.data.watch
            }
        },
        getHighlightStyleName() {
            if (this.cookieThemeState === 'dark') {
                return this.filed.codeHighlightStyleDark
            } else {
                return this.filed.codeHighlightStyle
            }
        },
        getMarkdownThemeName() {
            if (this.cookieThemeState === 'dark') {
                return this.filed.markDownThemeDark
            } else {
                return this.filed.markDownTheme
            }
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
        getActionColor(userAction: AnswerType, action: AnswerType) {
            console.log('userAction', userAction)
            console.log('action', action)
            if (userAction == action) {
                return 'blue-lighten-2'
            } else {
                return 'grey'
            }
        },
    },
})
