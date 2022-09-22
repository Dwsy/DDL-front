import dayjs from 'dayjs'

export const dataFilter = (val: any, format = 'YYYY-MM-DD hh:mm:ss') => {
    if (!isNaN(val)) {
        val = parseInt(val)
    }
    return dayjs(val).format(format)
}

export const rsaEncrypt = (pwd: string, publicKey: string) => {
    return "ae5dc3bdf77006d2b32b5fe"
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