import 'juejin-markdown-themes/dist/vue-pro'
import {MarkdownTheme, MarkdownThemeNameList} from '~/types/other/markdownTheme'

export const changeThemes = async (markdownTheme: MarkdownTheme) => {
    let css = null
    switch (markdownTheme.name) {
        case 'smartblue':
            css = await import ('juejin-markdown-themes/dist/smartblue')
            break
        case 'cyanosis':
            css = await import ('juejin-markdown-themes/dist/cyanosis')
            break
        case 'channing-cyan':
            css = await import ('juejin-markdown-themes/dist/channing-cyan')
            break
        case 'fancy':
            css = await import ('juejin-markdown-themes/dist/fancy')
            break
        case 'hydrogen':
            css = await import ('juejin-markdown-themes/dist/hydrogen')
            break
        case 'condensed-night-purple':
            css = await import ('juejin-markdown-themes/dist/condensed-night-purple')
            break
        case 'greenwillow':
            css = await import ('juejin-markdown-themes/dist/greenwillow')
            break
        case 'v-green':
            css = await import ('juejin-markdown-themes/dist/v-green')
            break
        case 'vue-pro':
            css = await import ('juejin-markdown-themes/dist/vue-pro')
            break
        case 'healer-readable':
            css = await import ('juejin-markdown-themes/dist/healer-readable')
            break
        case 'mk-cute':
            css = await import ('juejin-markdown-themes/dist/mk-cute')
            break
        case 'awesome-green':
            css = await import ('juejin-markdown-themes/dist/awesome-green')
            break
        case 'geek-black':
            css = await import ('juejin-markdown-themes/dist/geek-black')
            break
        case 'jzman':
            css = await import ('juejin-markdown-themes/dist/jzman')
            break
        case 'vuepress':
            css = await import ('juejin-markdown-themes/dist/vuepress')
            break
        case 'arknights':
            css = await import ('juejin-markdown-themes/dist/arknights')
            break
        case 'simplicity-green':
            css = await import ('juejin-markdown-themes/dist/simplicity-green')
            break
        case 'scrolls':
            css = await import ('juejin-markdown-themes/dist/scrolls-light')
            break
        case 'orange':
            css = await import ('juejin-markdown-themes/dist/orange')
            break
        case 'devui-blue':
            css = await import ('juejin-markdown-themes/dist/devui-blue')
            break
        case 'nico':
            css = await import ('juejin-markdown-themes/dist/nico')
            break
        case 'Chinese-red':
            css = await import ('juejin-markdown-themes/dist/Chinese-red')
            break
        default:
            css = await import ('juejin-markdown-themes/dist/Chinese-red')
    }
    let markdownThemeStyleElement = document.querySelector('#markdownTheme')
    if (markdownThemeStyleElement) {
        markdownThemeStyleElement.innerHTML = css.default
    } else {
        markdownThemeStyleElement = document.createElement('style')
        markdownThemeStyleElement.id = 'markdownTheme'
        markdownThemeStyleElement.innerHTML = css.default
        document.head.appendChild(markdownThemeStyleElement)
    }
}

export const themes: Record<MarkdownThemeNameList, MarkdownTheme> = {
    smartblue: {
        name: 'smartblue',
        path: '',
        highlight: ''
    },
    cyanosis: {
        name: 'cyanosis',
        path: '',
        highlight: ''
    },
    channingCyan: {
        name: 'channing-cyan',
        path: '',
        highlight: ''
    },
    fancy: {
        name: 'fancy',
        path: '',
        highlight: ''
    },
    hydrogen: {
        name: 'hydrogen',
        path: '',
        highlight: ''
    },
    condensedNightPurple: {
        name: 'condensed-night-purple',
        path: '',
        highlight: ''
    },
    greenwillow: {
        name: 'greenwillow',
        path: '',
        highlight: ''
    },
    vGreen: {
        name: 'v-green',
        path: '',
        highlight: ''
    },
    vuePro: {
        name: 'vue-pro',
        path: '',
        highlight: ''
    },
    healerReadable: {
        name: 'healer-readable',
        path: '',
        highlight: ''
    },
    mkCute: {
        name: 'mk-cute',
        path: '',
        highlight: ''
    },
    awesomeGreen: {
        name: 'awesome-green',
        path: '',
        highlight: ''
    },
    geekBlack: {
        name: 'geek-black',
        path: '',
        highlight: ''
    },
    jzman: {
        name: 'jzman',
        path: '',
        highlight: ''
    },
    vuepress: {
        name: 'vuepress',
        path: '',
        highlight: ''
    },
    arknights: {
        name: 'arknights',
        path: '',
        highlight: ''
    },
    simplicityGreen: {
        name: 'simplicity-green',
        path: '',
        highlight: ''
    },
    scrolls: {
        name: 'scrolls',
        path: '',
        highlight: ''
    },
    orange: {
        name: 'orange',
        path: '',
        highlight: ''
    },
    devuiBlue: {
        name: 'devui-blue',
        path: '',
        highlight: ''
    },
    nico: {
        name: 'nico',
        path: '',
        highlight: ''
    },
    ChineseRed: {
        name: 'Chinese-red',
        path: '',
        highlight: ''
    },
}
export const themeNameList = ['smartblue', 'cyanosis', 'channingCyan', 'fancy', 'hydrogen', 'condensedNightPurple', 'greenwillow', 'vGreen', 'vuePro', 'healerReadable', 'mkCute', 'awesomeGreen', 'geekBlack', 'jzman', 'vuepress', 'arknights', 'simplicityGreen', 'scrolls', 'orange', 'devuiBlue', 'nico', 'ChineseRed']
export const themesList: MarkdownTheme[] = [
    {
        name: 'smartblue',
        path: '',
        highlight: ''
    },
    {
        name: 'cyanosis',
        path: '',
        highlight: ''
    },
    {
        name: 'channing-cyan',
        path: '',
        highlight: ''
    },
    {
        name: 'fancy',
        path: '',
        highlight: ''
    },
    {
        name: 'hydrogen',
        path: '',
        highlight: ''
    },
    {
        name: 'condensed-night-purple',
        path: '',
        highlight: ''
    },
    {
        name: 'greenwillow',
        path: '',
        highlight: ''
    },
    {
        name: 'v-green',
        path: '',
        highlight: ''
    },
    {
        name: 'vue-pro',
        path: '',
        highlight: ''
    },
    {
        name: 'healer-readable',
        path: '',
        highlight: ''
    },
    {
        name: 'mk-cute',
        path: '',
        highlight: ''
    },
    {
        name: 'awesome-green',
        path: '',
        highlight: ''
    },
    {
        name: 'geek-black',
        path: '',
        highlight: ''
    },
    {
        name: 'jzman',
        path: '',
        highlight: ''
    },
    {
        name: 'vuepress',
        path: '',
        highlight: ''
    },
    {
        name: 'arknights',
        path: '',
        highlight: ''
    },
    {
        name: 'simplicity-green',
        path: '',
        highlight: ''
    },
    {
        name: 'scrolls',
        path: '',
        highlight: ''
    },
    {
        name: 'orange',
        path: '',
        highlight: ''
    },
    {
        name: 'devui-blue',
        path: '',
        highlight: ''
    },
    {
        name: 'nico',
        path: '',
        highlight: ''
    },
    {
        name: 'Chinese-red',
        path: '',
        highlight: ''
    },
]
// 主题	作者	License
// smartblue	Tusi	MIT
// cyanosis	林小帅	MIT
// channing-cyan	ChanningHylraised_hands	MIT
// fancy	冷石 Boy	MIT
// hydrogen	DawnLck 在掘金	MIT
// condensed-night-purple	童欧巴	MIT
// greenwillow	wangly19	MIT
// 	DawnLck 在掘金	MIT
// vue-pro	杭州程序员张张	MIT
// healer-readable	healer	MIT
// mk-cute	JackySummer	MIT
// jzman	躬行之	MIT
// geek-black	林景宜	MIT
// awesome-green	luffyZh	MIT
// orange	RudeCrab	MIT
// scrolls	道道里	MIT
// simplicity-green	Jason_Guo	MIT
// arknights	viewweiwu	MIT
// vuepress	qgh	MIT
// Chinese-red	Mancuoj	MIT
// nico	非思不可	MIT
// devui-blue	DevUI团队	MIT
