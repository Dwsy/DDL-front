import 'juejin-markdown-themes/dist/vue-pro'
import {MarkdownTheme, MarkdownThemeNameList} from '~/types/other/markdownTheme'

const mwebThemePath = '~~/constant/mwebMarkDownThemes/'
export const changeThemes = async (markdownTheme: MarkdownTheme) => {
    let css = null

    const s = new Date().getTime()


    // console.log(await import('~~/constant/mwebMarkDownThemes/dark/ayuMirage'))

    console.log('markdownTheme.name', markdownTheme.name)
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
        //--------------
        case 'ayuMirage':
            css = await import('~~/constant/MarkDownThemes/dark/ayuMirage')
            break
        case 'charcoal':
            css = await import('~~/constant/MarkDownThemes/dark/charcoal')
            break
        case 'cobalt':
            css = await import('~~/constant/MarkDownThemes/dark/cobalt')
            break
        case 'darkGraphite':
            css = await import('~~/constant/MarkDownThemes/dark/darkGraphite')
            break
        case 'dieci':
            css = await import('~~/constant/MarkDownThemes/dark/dieci')
            break
        case 'dracula':
            css = await import('~~/constant/MarkDownThemes/dark/dracula')
            break
        case 'lighthouse':
            css = await import('~~/constant/MarkDownThemes/dark/lighthouse')
            break
        case 'nord':
            css = await import('~~/constant/MarkDownThemes/dark/nord')
            break
        case 'panic':
            css = await import('~~/constant/MarkDownThemes/dark/panic')
            break
        case 'gotham':
            css = await import('~~/constant/MarkDownThemes/dark/gotham')
            break
        case 'solarizedDark':
            css = await import('~~/constant/MarkDownThemes/dark/solarizedDark')
            break
        case 'toothpaste':
            css = await import('~~/constant/MarkDownThemes/dark/toothpaste')
            break
        case 'ayu':
            css = await import('~~/constant/MarkDownThemes/light/ayu')
            break
        case 'contrast':
            css = await import('~~/constant/MarkDownThemes/light/contrast')
            break
        case 'dBoring':
            css = await import('~~/constant/MarkDownThemes/light/dBoring')
            break
        case 'duotoneHeat':
            css = await import('~~/constant/MarkDownThemes/light/duotoneHeat')
            break
        case 'indigo':
            css = await import('~~/constant/MarkDownThemes/light/indigo')
            break
        case 'larkBoldColor':
            css = await import('~~/constant/MarkDownThemes/light/larkBoldColor')
            break
        case 'gandalf':
            css = await import('~~/constant/MarkDownThemes/light/gandalf')
            break
        case 'lark':
            css = await import('~~/constant/MarkDownThemes/light/lark')
            break
        case 'duotoneLight':
            css = await import('~~/constant/MarkDownThemes/light/duotoneLight')
            break
        case 'oliveDunk':
            css = await import('~~/constant/MarkDownThemes/light/oliveDunk')
            break
        case 'redGraphite':
            css = await import('~~/constant/MarkDownThemes/light/redGraphite')
            break
        case 'solarizedLight':
            css = await import('~~/constant/MarkDownThemes/light/solarizedLight')
            break
        case 'geekBlackDark':
            css = await import('~~/constant/MarkDownThemes/dark/geekBlackDark')
            break
        default:
            css = await import ('juejin-markdown-themes/dist/Chinese-red')
    }
    console.log(css.default)
    let markdownThemeStyleElement = document.querySelector('#markdownTheme')
    if (markdownThemeStyleElement) {
        markdownThemeStyleElement.innerHTML = css.default
    } else {
        console.log('创建style标签')
        markdownThemeStyleElement = document.createElement('style')
        markdownThemeStyleElement.id = 'markdownTheme'
        markdownThemeStyleElement.innerHTML = css.default
        document.head.appendChild(markdownThemeStyleElement)
    }
    console.log('markdownThemeStyleElement', new Date().getTime() - s)
}

export const themes: Record<MarkdownThemeNameList, MarkdownTheme> = {
    geekBlackDark: {
        name: 'geekBlackDark',
        path: '',
        highlight: ''
    },
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
    //---
    ayu: {
        name: 'ayu',
        path: `${mwebThemePath}ayu`,
        highlight: ''
    },
    ayuMirage: {
        name: 'ayuMirage',
        path: '',
        highlight: ''
    },
    charcoal: {
        name: 'charcoal',
        path: `${mwebThemePath}charcoal`,
        highlight: ''
    },
    cobalt: {
        name: 'cobalt',
        path: `${mwebThemePath}cobalt`,
        highlight: ''
    },
    contrast: {
        name: 'contrast',
        path: `${mwebThemePath}contrast`,
        highlight: ''
    },
    dBoring: {
        name: 'dBoring',
        path: '',
        highlight: ''
    },
    darkGraphite: {
        name: 'darkGraphite',
        path: '',
        highlight: ''
    },
    dieci: {
        name: 'dieci',
        path: '',
        highlight: ''
    },
    dracula: {
        name: 'dracula',
        path: '',
        highlight: ''
    },
    duotoneHeat: {
        name: 'duotoneHeat',
        path: '',
        highlight: ''
    },
    duotoneLight: {
        name: 'duotoneLight',
        path: '',
        highlight: ''
    },
    gandalf: {
        name: 'gandalf',
        path: '',
        highlight: ''
    },
    gotham: {
        name: 'gotham',
        path: '',
        highlight: ''
    },
    indigo: {
        name: 'indigo',
        path: '',
        highlight: ''
    },
    lark: {
        name: 'lark',
        path: '',
        highlight: ''
    },
    larkBoldColor: {
        name: 'larkBoldColor',
        path: '',
        highlight: ''
    },
    lighthouse: {
        name: 'lighthouse',
        path: '',
        highlight: ''
    },
    nord: {
        name: 'nord',
        path: '',
        highlight: ''
    },
    oliveDunk: {
        name: 'oliveDunk',
        path: '',
        highlight: ''
    },
    panic: {
        name: 'panic',
        path: '',
        highlight: ''
    },
    redGraphite: {
        name: 'redGraphite',
        path: '',
        highlight: ''
    },
    solarizedDark: {
        name: 'solarizedDark',
        path: '',
        highlight: ''
    },
    solarizedLight: {
        name: 'solarizedLight',
        path: '',
        highlight: ''
    },
    toothpaste: {
        name: 'toothpaste',
        path: '',
        highlight: ''
    }

}

export let themeNameList = ['smartblue', 'cyanosis', 'channingCyan', 'fancy', 'hydrogen', 'condensedNightPurple', 'greenwillow', 'vGreen', 'vuePro', 'healerReadable', 'mkCute', 'awesomeGreen', 'geekBlack', 'jzman', 'vuepress', 'arknights', 'simplicityGreen', 'scrolls', 'orange', 'devuiBlue', 'nico', 'ChineseRed']


export let mwebLightNameList = [
    'ayu',
    'contrast',
    'dBoring',
    'duotoneHeat',
    'indigo',
    'larkBoldColor',
    'gandalf',
    'lark',
    'duotoneLight',
    'oliveDunk',
    'redGraphite',
    'solarizedLight'
]


export let mwebDarkList = [
    'geekBlackDark',
    'ayuMirage',
    'charcoal',
    'cobalt',
    'darkGraphite',
    'dieci',
    'dracula',
    'lighthouse',
    'nord',
    'panic',
    'gotham',
    'solarizedDark',
    'toothpaste'
]
// themeNameList.push(...mwebLightNameList)
// themeNameList.push(...mwebDarkList)

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
