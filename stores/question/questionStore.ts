import {defineStore} from 'pinia'
import {QuestionField} from '~/types/question'
import {changeThemes, themes} from '~/constant/markdownThemeList'
import {changeHighlightStyle} from '~/constant/highlightStyleList'
import {AnswerType} from '~/types/question/answer'

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
        getActionColor(action: AnswerType) {
            if (action === AnswerType.up || action === AnswerType.down) {
                return 'blue-lighten-2'
            } else {
                return 'grey'
            }

        },
    },
})