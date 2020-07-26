const CryptoJS = require('crypto-js')
// import CryptoJS from '../../assets/javascript/crypto-js'
const key = CryptoJS.enc.Utf8.parse('huayunabcd123456') // 十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse('huayunkjsecurity');   //十六位十六进制数作为密钥偏移量

// 解密方法
function Decrypt(word) {
    const decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

// 加密方法
function Encrypt(word) {
    const srcs = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    return encrypted.toString()
}

export default {
    Decrypt,
    Encrypt
}
