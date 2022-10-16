// node fs模块
const fs = require('fs')
// node path模块
const path = require('path')
// 被读取的文件夹地址
const filePath = path.resolve('/home/dwsy/code/ddl-front/node_modules/highlight.js/styles')
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
                        // arr.push(o)
                        // console.log(arr)

                        // fs.watchFile('./highlightStyleNamelist.js',)
                        fs.writeFile(`./highlightCJs/${o.replace('.css', '.js')}`, cjs, function (err) {
                            // 如果err为true，则文件写入失败，并返回失败信息
                            if (err) {
                                return console.error('文件写入失败！' + err.message)
                            }
                            // 若文件写入成功，将显示“文件写入成功”
                            console.log(filename)
                            console.log('文件写入成功！')
                        })
                        console.log(dataStr)
                    })
                }

            })

        })
    })
}

fileDisplay(filePath)

let nameList = [
    'a11yDark.css',
    'a11yLight.css',
    'agate.css',
    'anOldHope.css',
    'androidstudio.css',
    'arduinoLight.css',
    'atomOneDarkReasonable.css',
    'arta.css',
    'ascetic.css',
    'atomOneDark.css',
    'atomOneLight.css',
    'brownPaper.css',
    'brownPapersq.png',
    'codepenEmbed.css',
    'colorBrewer.css',
    'dark.css',
    'devibeans.css',
    'default.css',
    'docco.css',
    'far.css',
    'foundation.css',
    'felipec.css',
    'githubDarkDimmed.css',
    'github.css',
    'githubDark.css',
    'gml.css',
    'gradientDark.css',
    'gradientLight.css',
    'googlecode.css',
    'grayscale.css',
    'hybrid.css',
    'idea.css',
    'intellijLight.css',
    'irBlack.css',
    'isblEditorDark.css',
    'isblEditorLight.css',
    'kimbieDark.css',
    'kimbieLight.css',
    'magula.css',
    'lightfair.css',
    'lioshi.css',
    'monoBlue.css',
    'monokaiSublime.css',
    'monokai.css',
    'nnfxDark.css',
    'nightOwl.css',
    'nnfxLight.css',
    'nord.css',
    'obsidian.css',
    'pandaSyntaxDark.css',
    'pandaSyntaxLight.css',
    'paraisoDark.css',
    'paraisoLight.css',
    'pojoaque.css',
    'pojoaque.jpg',
    'purebasic.css',
    'qtcreatorDark.css',
    'qtcreatorLight.css',
    'rainbow.css',
    'routeros.css',
    'schoolBook.css',
    'srcery.css',
    'stackoverflowDark.css',
    'shadesOfPurple.css',
    'stackoverflowLight.css',
    'sunburst.css',
    'tokyoNightDark.css',
    'tokyoNightLight.css',
    'tomorrowNightBlue.css',
    'tomorrowNightBright.css',
    'vs.css',
    'vs2015.css',
    'xcode.css',
    'xt256.css'
]