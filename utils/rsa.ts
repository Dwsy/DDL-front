import { NodeRsa } from 'node-rsa'
// 加密
export const RsaEncrypt = (str, publicKey) => {
    const nodersa = new NodeRsa(publicKey)
    // nodersa.setOptions({ encryptionScheme: 'pkcs1' })
    return nodersa.encrypt(str, 'base64')
}

