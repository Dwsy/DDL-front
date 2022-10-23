import dayjs from 'dayjs'
import {el} from 'vuetify/locale'

export const dateFilter = (val: any, format = 'YYYY-MM-DD hh:mm:ss') => {
    if (!isNaN(val)) {
        val = parseInt(val)
    }
    return dayjs(val).format(format)
}

export const isUrl = (urls: string) => {
    if (urls.length <= 1) {
        return false
    }
    let regexp = /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig
    let url = urls.match(regexp)
    return url && typeof (url) != 'undefined'
}

export const rsaEncrypt = (pwd: string, publicKey: string) => {
    return 'ae5dc3bdf77006d2b32b5fe'
    // const crypto = new Crypto()
    // const publicKey1 = await crypto.subtle.importKey(
    //     "jwk",
    //     {
    //         alg: "RS256",
    //         ext: true,
    //         key_ops: ["verify"],
    //         kty: "RSA",
    //         e: "AQAB",
    //         n: "publicKey",
    //     },
    //     {
    //         name: "RSASSA-PKCS1-v1_5",
    //         hash: "SHA-256",
    //     },
    //     false,
    //     ["verify"],
    // )
    //
    // const encData = await crypto.subtle.encrypt(
    //     'RSAES-PKCS1-v1_5',
    //     publicKey1,  // RSA public key
    //     str2ab(pwd),       // BufferSource
    // )
}

// 字符串转为ArrayBuffer对象，参数为字符串
function str2ab(str) {
    let buf = new ArrayBuffer(str.length * 2) // 每个字符占用2个字节
    let bufView = new Uint16Array(buf)
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i)
    }
    return buf
}

export function isNumber(str) {
    return /^\d+$/.test(str)
}

/**
 * 转换一段文字中的 url 为 a 标签
 * @param {String} str 要转换的字符串
 * @returns {String} linkStr 转换后的字符串
 */
export const urlToLink = (str) => {
    if (!str) {
        return str
    }

    // 防止 XSS攻击
    str = xssFilter(str)

    const re = /(f|ht){1}(tp|tps):\/\/([\w-]+\S)+[\w-]+([\w-?%#&=]*)?(\/[\w- ./?%#&=]*)?/g

    str = str.replace(re, function (url) {
        return `<a href=${url} target="_blank"> ${url} </a>`
    })
    return str
}

export const xssFilter = (html) => {
    const divStub = document.createElement('div')
    if (divStub.textContent !== undefined) {
        divStub.textContent = html
    } else {
        // for ie9-
        divStub.innerText = html
    }
    return divStub.innerHTML
}

export const atSrtGotoHome = (s: string, userId: string) => {
    let str = s.substring(s.indexOf('@'), s.indexOf('：') + 1)
    let linkStr = `<a class="d-gotoHome" href="/user/${userId}" target="_blank">${str}</a>`
    return s.replace(str, linkStr)
}

export const useLoadingWin = (loadingMore: Function) => {
    console.log(123123)
    return async () => {
        //文档内容实际高度（包括超出视窗的溢出部分）
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
        //滚动条滚动距离
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //窗口可视范围高度
        let clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
        if (clientHeight + scrollTop + 100 >= scrollHeight) {
            await loadingMore()
        }
    }
}


export const handleCopy = (el) => {
    const range = document.createRange()
    range.selectNode(el)
    const selection = window.getSelection()
    if (selection.rangeCount > 0) selection.removeAllRanges()
    selection.addRange(range)
    console.log(range)
    document.execCommand('copy')
    selection.removeRange(range)
}
