export const changeHighlightStyle = async (name: string, ssr?: boolean) => {
    let css = null
    console.log('HighlightStyle', name)
    switch (name) {
        case 'a11yDark':
            css = await import ('~~/constant/highlightCJs/a11yDark')
            break
        case 'a11yLight':
            css = await import ('~~/constant/highlightCJs/a11yLight')
            break
        case 'agate':
            css = await import ('~~/constant/highlightCJs/agate')
            break
        case 'anOldHope':
            css = await import ('~~/constant/highlightCJs/anOldHope')
            break
        case 'androidstudio':
            css = await import ('~~/constant/highlightCJs/androidstudio')
            break
        case 'arduinoLight':
            css = await import ('~~/constant/highlightCJs/arduinoLight')
            break
        case 'atomOneDarkReasonable':
            css = await import ('~~/constant/highlightCJs/atomOneDarkReasonable')
            break
        case 'arta':
            css = await import ('~~/constant/highlightCJs/arta')
            break
        case 'ascetic':
            css = await import ('~~/constant/highlightCJs/ascetic')
            break
        case 'atomOneDark':
            css = await import ('~~/constant/highlightCJs/atomOneDark')
            break
        case 'atomOneLight':
            css = await import ('~~/constant/highlightCJs/atomOneLight')
            break
        case 'brownPaper':
            css = await import ('~~/constant/highlightCJs/brownPaper')
            break
        // case 'brownPapersq.png':
        //     css = await import ('~~/constant/highlightCJs/brownPapersq.png')
        //     break
        case 'codepenEmbed':
            css = await import ('~~/constant/highlightCJs/codepenEmbed')
            break
        case 'colorBrewer':
            css = await import ('~~/constant/highlightCJs/colorBrewer')
            break
        case 'dark':
            css = await import ('~~/constant/highlightCJs/dark')
            break
        case 'devibeans':
            css = await import ('~~/constant/highlightCJs/devibeans')
            break
        case 'Default':
            css = await import ('~~/constant/highlightCJs/default')
            break
        case 'docco':
            css = await import ('~~/constant/highlightCJs/docco')
            break
        case 'far':
            css = await import ('~~/constant/highlightCJs/far')
            break
        case 'foundation':
            css = await import ('~~/constant/highlightCJs/foundation')
            break
        case 'felipec':
            css = await import ('~~/constant/highlightCJs/felipec')
            break
        case 'githubDarkDimmed':
            css = await import ('~~/constant/highlightCJs/githubDarkDimmed')
            break
        case 'github':
            css = await import ('~~/constant/highlightCJs/github')
            break
        case 'githubDark':
            css = await import ('~~/constant/highlightCJs/githubDark')
            break
        case 'gml':
            css = await import ('~~/constant/highlightCJs/gml')
            break
        case 'gradientDark':
            css = await import ('~~/constant/highlightCJs/gradientDark')
            break
        case 'gradientLight':
            css = await import ('~~/constant/highlightCJs/gradientLight')
            break
        case 'googlecode':
            css = await import ('~~/constant/highlightCJs/googlecode')
            break
        case 'grayscale':
            css = await import ('~~/constant/highlightCJs/grayscale')
            break
        case 'hybrid':
            css = await import ('~~/constant/highlightCJs/hybrid')
            break
        case 'idea':
            css = await import ('~~/constant/highlightCJs/idea')
            break
        case 'intellijLight':
            css = await import ('~~/constant/highlightCJs/intellijLight')
            break
        case 'irBlack':
            css = await import ('~~/constant/highlightCJs/irBlack')
            break
        case 'isblEditorDark':
            css = await import ('~~/constant/highlightCJs/isblEditorDark')
            break
        case 'isblEditorLight':
            css = await import ('~~/constant/highlightCJs/isblEditorLight')
            break
        case 'kimbieDark':
            css = await import ('~~/constant/highlightCJs/kimbieDark')
            break
        case 'kimbieLight':
            css = await import ('~~/constant/highlightCJs/kimbieLight')
            break
        case 'magula':
            css = await import ('~~/constant/highlightCJs/magula')
            break
        case 'lightfair':
            css = await import ('~~/constant/highlightCJs/lightfair')
            break
        case 'lioshi':
            css = await import ('~~/constant/highlightCJs/lioshi')
            break
        case 'monoBlue':
            css = await import ('~~/constant/highlightCJs/monoBlue')
            break
        case 'monokaiSublime':
            css = await import ('~~/constant/highlightCJs/monokaiSublime')
            break
        case 'monokai':
            css = await import ('~~/constant/highlightCJs/monokai')
            break
        case 'nnfxDark':
            css = await import ('~~/constant/highlightCJs/nnfxDark')
            break
        case 'nightOwl':
            css = await import ('~~/constant/highlightCJs/nightOwl')
            break
        case 'nnfxLight':
            css = await import ('~~/constant/highlightCJs/nnfxLight')
            break
        case 'nord':
            css = await import ('~~/constant/highlightCJs/nord')
            break
        case 'obsidian':
            css = await import ('~~/constant/highlightCJs/obsidian')
            break
        case 'pandaSyntaxDark':
            css = await import ('~~/constant/highlightCJs/pandaSyntaxDark')
            break
        case 'pandaSyntaxLight':
            css = await import ('~~/constant/highlightCJs/pandaSyntaxLight')
            break
        case 'paraisoDark':
            css = await import ('~~/constant/highlightCJs/paraisoDark')
            break
        case 'paraisoLight':
            css = await import ('~~/constant/highlightCJs/paraisoLight')
            break
        case 'pojoaque':
            css = await import ('~~/constant/highlightCJs/pojoaque')
            break
        // case 'pojoaque.jpg':
        //     css = await import ('~~/constant/highlightCJs/pojoaque.jpg')
        //     break
        case 'purebasic':
            css = await import ('~~/constant/highlightCJs/purebasic')
            break
        case 'qtcreatorDark':
            css = await import ('~~/constant/highlightCJs/qtcreatorDark')
            break
        case 'qtcreatorLight':
            css = await import ('~~/constant/highlightCJs/qtcreatorLight')
            break
        case 'rainbow':
            css = await import ('~~/constant/highlightCJs/rainbow')
            break
        case 'routeros':
            css = await import ('~~/constant/highlightCJs/routeros')
            break
        case 'schoolBook':
            css = await import ('~~/constant/highlightCJs/schoolBook')
            break
        case 'srcery':
            css = await import ('~~/constant/highlightCJs/srcery')
            break
        case 'stackoverflowDark':
            css = await import ('~~/constant/highlightCJs/stackoverflowDark')
            break
        case 'shadesOfPurple':
            css = await import ('~~/constant/highlightCJs/shadesOfPurple')
            break
        case 'stackoverflowLight':
            css = await import ('~~/constant/highlightCJs/stackoverflowLight')
            break
        case 'sunburst':
            css = await import ('~~/constant/highlightCJs/sunburst')
            break
        case 'tokyoNightDark':
            css = await import ('~~/constant/highlightCJs/tokyoNightDark')
            break
        case 'tokyoNightLight':
            css = await import ('~~/constant/highlightCJs/tokyoNightLight')
            break
        case 'tomorrowNightBlue':
            css = await import ('~~/constant/highlightCJs/tomorrowNightBlue')
            break
        case 'tomorrowNightBright':
            css = await import ('~~/constant/highlightCJs/tomorrowNightBright')
            break
        case 'vs':
            css = await import ('~~/constant/highlightCJs/vs')
            break
        case 'vs2015':
            css = await import ('~~/constant/highlightCJs/vs2015')
            break
        case 'xcode':
            css = await import ('~~/constant/highlightCJs/xcode')
            break
        case 'xt256':
            css = await import ('~~/constant/highlightCJs/xt256')
            break
        default:
            css = await import ('~~/constant/highlightCJs/xcode')
    }
    if (ssr === true) {
        return css.default
    }
    let markdownThemeStyleElement = document.querySelector('#highlightStyle')
    // console.log(css)
    if (markdownThemeStyleElement) {
        markdownThemeStyleElement.innerHTML = css.default
    } else {
        markdownThemeStyleElement = document.createElement('style')
        markdownThemeStyleElement.id = 'highlightStyle'
        markdownThemeStyleElement.innerHTML = css.default
        document.head.appendChild(markdownThemeStyleElement)
    }
}

export type HighlightStyleName =
    string |
    'a11yDark' |
    'a11yLight' |
    'agate' |
    'anOldHope' |
    'androidstudio' |
    'arduinoLight' |
    'atomOneDarkReasonable' |
    'arta' |
    'ascetic' |
    'atomOneDark' |
    'atomOneLight' |
    'brownPaper' |
    'brownPapersq.png' |
    'codepenEmbed' |
    'colorBrewer' |
    'dark' |
    'devibeans' |
    'Default' |
    'docco' |
    'far' |
    'foundation' |
    'felipec' |
    'githubDarkDimmed' |
    'github' |
    'githubDark' |
    'gml' |
    'gradientDark' |
    'gradientLight' |
    'googlecode' |
    'grayscale' |
    'hybrid' |
    'idea' |
    'intellijLight' |
    'irBlack' |
    'isblEditorDark' |
    'isblEditorLight' |
    'kimbieDark' |
    'kimbieLight' |
    'magula' |
    'lightfair' |
    'lioshi' |
    'monoBlue' |
    'monokaiSublime' |
    'monokai' |
    'nnfxDark' |
    'nightOwl' |
    'nnfxLight' |
    'nord' |
    'obsidian' |
    'pandaSyntaxDark' |
    'pandaSyntaxLight' |
    'paraisoDark' |
    'paraisoLight' |
    'pojoaque' |
    // 'pojoaque.jpg' |
    'purebasic' |
    'qtcreatorDark' |
    'qtcreatorLight' |
    'rainbow' |
    'routeros' |
    'schoolBook' |
    'srcery' |
    'stackoverflowDark' |
    'shadesOfPurple' |
    'stackoverflowLight' |
    'sunburst' |
    'tokyoNightDark' |
    'tokyoNightLight' |
    'tomorrowNightBlue' |
    'tomorrowNightBright' |
    'vs' |
    'vs2015' |
    'xcode' |
    'xt256'


export const HighlightStyleNameList = [
    'a11yDark',
    'a11yLight',
    'agate',
    'anOldHope',
    'androidstudio',
    'arduinoLight',
    'atomOneDarkReasonable',
    'arta',
    'ascetic',
    'atomOneDark',
    'atomOneLight',
    'brownPaper',
    // 'brownPapersq.png',
    'codepenEmbed',
    'colorBrewer',
    'dark',
    'devibeans',
    'Default',
    'docco',
    'far',
    'foundation',
    'felipec',
    'githubDarkDimmed',
    'github',
    'githubDark',
    'gml',
    'gradientDark',
    'gradientLight',
    'googlecode',
    'grayscale',
    'hybrid',
    'idea',
    'intellijLight',
    'irBlack',
    'isblEditorDark',
    'isblEditorLight',
    'kimbieDark',
    'kimbieLight',
    'magula',
    'lightfair',
    'lioshi',
    'monoBlue',
    'monokaiSublime',
    'monokai',
    'nnfxDark',
    'nightOwl',
    'nnfxLight',
    'nord',
    'obsidian',
    'pandaSyntaxDark',
    'pandaSyntaxLight',
    'paraisoDark',
    'paraisoLight',
    'pojoaque',
    // 'pojoaque.jpg',
    'purebasic',
    'qtcreatorDark',
    'qtcreatorLight',
    'rainbow',
    'routeros',
    'schoolBook',
    'srcery',
    'stackoverflowDark',
    'shadesOfPurple',
    'stackoverflowLight',
    'sunburst',
    'tokyoNightDark',
    'tokyoNightLight',
    'tomorrowNightBlue',
    'tomorrowNightBright',
    'vs',
    'vs2015',
    'xcode',
    'xt256'
]