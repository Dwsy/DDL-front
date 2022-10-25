// node fs模块
const fs = require('fs')
// node path模块
const path = require('path')
// 被读取的文件夹地址
// const filePath = path.resolve('/home/dwsy/code/ddl-front/node_modules/highlight.js/styles')
const filePath = path.resolve('/home/dwsy/code/ddl-front/node_modules/highlight.js/styles/base16')
// 收集所有的文件路径
const fileDisplay = filePath => {
    fs.exists('./highlightCJs', function (exists) {
        if (!exists) {
            fs.mkdir('./highlightCJs', function (err) {
                if (err)
                    console.error(err)
                console.log('创建目录成功')
            })
        }
    })

    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        let arr = []
        if (err) return console.error('Error:(spec)', err)
        for (let i = 0; i < files.length; i++) {
            let filename = files[i]
            let a = filename.split('-')
            let o = a[0]
            for (let i = 1; i < a.length; i++) {
                o = o + a[i].slice(0, 1).toUpperCase() + a[i].slice(1)
            }
            arr.push(o)

        }
        console.log(arr)
        files.forEach((filename) => {
            //获取当前文件的绝对路径
            const fileDir = path.join(filePath, filename)
            // fs.stat(path)执行后，会将stats类的实例返回给其回调函数。
            fs.stat(fileDir, (eror, stats) => {
                if (eror) return console.error('Error:(spec)', err)
                // 是否是文件
                const isFile = stats.isFile()
                // 是否是文件夹
                const isDir = stats.isDirectory()
                if (isFile) {
                    // console.log(filedir)
                    fs.readFile(fileDir, 'utf8', function (err, dataStr) {
                        const cjs = `export default \`${dataStr}\``


                        let a = filename.split('-')
                        let o = a[0]
                        for (let i = 1; i < a.length; i++) {
                            o = o + a[i].slice(0, 1).toUpperCase() + a[i].slice(1)
                        }
                        arr.push(o)
                        // console.log(arr)

                        // fs.watchFile('./highlightStyleNamelist.js',)
                        // fs.writeFile(`./highlightCJs/base16/${o.replace('', '.ts')}`, cjs, function (err) {
                        //     // 如果err为true，则文件写入失败，并返回失败信息
                        //     if (err) {
                        //         return console.error('文件写入失败！' + err.message)
                        //     }
                        //     // 若文件写入成功，将显示“文件写入成功”
                        //     console.log(filename)
                        //     console.log('文件写入成功！')
                        // })
                        // console.log(dataStr)
                    })
                }

            })

        })
    })
}

// fileDisplay(filePath)

let nameList = [
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
    'brownPapersq.png',
    'codepenEmbed',
    'colorBrewer',
    'dark',
    'devibeans',
    'default',
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
    'pojoaque.jpg',
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

let base16 = [
    '3024',
    'apathy',
    'apprentice',
    'ashes',
    'atelierCaveLight',
    'atelierCave',
    'atelierDuneLight',
    'atelierDune',
    'atelierEstuaryLight',
    'atelierEstuary',
    'atelierForestLight',
    'atelierForest',
    'atelierHeathLight',
    'atelierHeath',
    'atelierLakesideLight',
    'atelierLakeside',
    'atelierPlateauLight',
    'atelierPlateau',
    'atelierSavannaLight',
    'atelierSavanna',
    'atelierSeasideLight',
    'atelierSeaside',
    'atelierSulphurpoolLight',
    'atelierSulphurpool',
    'atlas',
    'bespin',
    'blackMetalBathory',
    'blackMetalBurzum',
    'blackMetalDarkFuneral',
    'blackMetalGorgoroth',
    'blackMetalImmortal',
    'blackMetalKhold',
    'blackMetalMarduk',
    'blackMetalMayhem',
    'blackMetalNile',
    'blackMetalVenom',
    'blackMetal',
    'brewer',
    'bright',
    'brogrammer',
    'brushTreesDark',
    'brushTrees',
    'chalk',
    'circus',
    'classicDark',
    'classicLight',
    'codeschool',
    'colors',
    'cupcake',
    'cupertino',
    'danqing',
    'darcula',
    'darkViolet',
    'darkmoss',
    'darktooth',
    'decaf',
    'defaultDark',
    'defaultLight',
    'dirtysea',
    'dracula',
    'edgeDark',
    'edgeLight',
    'eighties',
    'embers',
    'equilibriumDark',
    'equilibriumGrayDark',
    'equilibriumGrayLight',
    'equilibriumLight',
    'espresso',
    'evaDim',
    'eva',
    'flat',
    'framer',
    'fruitSoda',
    'gigavolt',
    'github',
    'googleDark',
    'googleLight',
    'grayscaleDark',
    'grayscaleLight',
    'greenScreen',
    'gruvboxDarkHard',
    'gruvboxDarkMedium',
    'gruvboxDarkPale',
    'gruvboxDarkSoft',
    'gruvboxLightHard',
    'gruvboxLightMedium',
    'gruvboxLightSoft',
    'hardcore',
    'harmonic16Dark',
    'harmonic16Light',
    'heetchDark',
    'heetchLight',
    'helios',
    'hopscotch',
    'horizonDark',
    'horizonLight',
    'humanoidDark',
    'humanoidLight',
    'iaDark',
    'iaLight',
    'icyDark',
    'irBlack',
    'isotope',
    'kimber',
    'londonTube',
    'macintosh',
    'marrakesh',
    'materia',
    'materialDarker',
    'materialLighter',
    'materialPalenight',
    'materialVivid',
    'material',
    'mellowPurple',
    'mexicoLight',
    'mocha',
    'monokai',
    'nebula',
    'nord',
    'nova',
    'ocean',
    'oceanicnext',
    'oneLight',
    'onedark',
    'outrunDark',
    'papercolorDark',
    'papercolorLight',
    'paraiso',
    'pasque',
    'phd',
    'pico',
    'pop',
    'porple',
    'qualia',
    'railscasts',
    'rebecca',
    'rosPineDawn',
    'rosPineMoon',
    'rosPine',
    'sagelight',
    'sandcastle',
    'setiUi',
    'shapeshifter',
    'silkDark',
    'silkLight',
    'snazzy',
    'solarFlareLight',
    'solarFlare',
    'solarizedDark',
    'solarizedLight',
    'spacemacs',
    'summercamp',
    'summerfruitDark',
    'summerfruitLight',
    'synthMidnightTerminalDark',
    'synthMidnightTerminalLight',
    'tango',
    'tender',
    'tomorrowNight',
    'tomorrow',
    'twilight',
    'unikittyDark',
    'unikittyLight',
    'vulcan',
    'windows10Light',
    'windows10',
    'windows95Light',
    'windows95',
    'windowsHighContrastLight',
    'windowsHighContrast',
    'windowsNtLight',
    'windowsNt',
    'woodland',
    'xcodeDusk',
    'zenburn'
]

for (let i = 0; i < base16.length; i++) {
    let template = `    case '{{1}}':
        css = await import ('~~/constant/highlightCJs/base16/{{2}}')
        break`
    template = template.replace('{{1}}', 'base16-' + base16[i])
    template = template.replace('{{2}}', base16[i])
    console.log(template)
}