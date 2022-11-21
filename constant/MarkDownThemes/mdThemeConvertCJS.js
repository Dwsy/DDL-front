const cwd = process.cwd()
// node fs模块
const fs = require('fs')
// node path模块
const path = require('path')
// 被读取的文件夹地址
// const dirName = 'dark'
const dirName = 'light'
const filePath = path.resolve(`${cwd}/${dirName}`)
// 收集所有的文件路径
const fileDisplay = (filePath) => {
    // fs.exists('./highlightCJs', function (exists) {
    //     if (!exists) {
    //         fs.mkdir('./highlightCJs', function (err) {
    //             if (err)
    //                 console.error(err)
    //             console.log('创建目录成功')
    //         })
    //     }
    // })
    //根据文件路径读取文件，返回文件列表
    let arr = []
    fs.readdir(filePath, function (err, files) {
        if (err) return console.error('Error:(spec)', err)
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
                        filename = filename.replace('typora-', '')
                        let a = filename.split('-')
                        let o = a[0]
                        for (let i = 1; i < a.length; i++) {
                            o = o + a[i].slice(0, 1).toUpperCase() + a[i].slice(1)
                        }
                        arr.push(o.replace('', '.js'))
                        // console.log(arr)
                        fs.writeFile(
                            `./${dirName}/${o.replace('.css', '.js')}`,
                            cjs,
                            function (err) {
                                // 如果err为true，则文件写入失败，并返回失败信息
                                if (err) {
                                    return console.error('文件写入失败！' + err.message)
                                }
                                // 若文件写入成功，将显示“文件写入成功”
                                // console.log(filename)
                                // console.log('文件写入成功！')
                            }
                        )
                        // console.log(dataStr)
                    })
                }
            })
        })
    })
}

fileDisplay(filePath)

let light = [
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
    'solarizedLight',
]

let dark = [
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
    'toothpaste',
]

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
    'xt256.css',
]
