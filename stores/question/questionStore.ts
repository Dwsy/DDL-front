import {defineStore} from 'pinia'
import {useFetchGetQuestionContent, useFetchGetQuestionField} from '~/composables/Api/question'
import {QuestionField} from '~/types/question'
import {useCookie} from '#app'
import {changeThemes, themes} from '~/constant/markdownThemeList'
import {changeHighlightStyle} from '~/constant/highlightStyleList'

interface QuestionStore {
    filed: QuestionField
    content: string
    cookieThemeState: string
    markdownThemeDark: string
    markdownThemeLight: string
    codeHighlightStyleDark: string
    codeHighlightStyleLight: string
}

export const useQuestionStore = defineStore('QuestionStore', {
    state: (): QuestionStore => (
        {
            filed: null,
            content: null,
            cookieThemeState: '',
            markdownThemeLight: null,
            markdownThemeDark: null,
            codeHighlightStyleDark: null,
            codeHighlightStyleLight: null,
        }
    ),
    actions: {
        async init() {
            this.markdownThemeDark = this.filed.markDownThemeDark
            this.markdownThemeLight = this.filed.markDownTheme
            this.codeHighlightStyleDark = this.filed.codeHighlightStyleDark
            this.codeHighlightStyleLight = this.filed.codeHighlightStyle
        },
        getHighlightStyleName() {
            console.log('this.cookieThemeState.value', this.filed)
            if (this.cookieThemeState === 'light') {
                return this.filed.codeHighlightStyle || 'xcode'
            } else {
                return this.filed.codeHighlightStyleDark || 'monokai'
            }
        },
        getMarkdownThemeName() {
            if (this.cookieThemeState === 'light') {
                return this.filed.markDownTheme || 'geekBlack'
            } else {
                return this.filed.markDownThemeDark || 'geekBlackDark'
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
    },
})