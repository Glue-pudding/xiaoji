/* eslint-disable */
import md5 from './utils/md5'
// import Barrett from './utils/Barrett'
// import BigInt from './utils/BigInt'
import RSA from './utils/RSA'
import base64 from './utils/base64'
const SHA = require('./utils/sha')

export default {
  base64,
  // Barrett,
  // BigInt,
  RSA,
  md5,
  sha(level = 'SHA-512', type = 'TEXT') {
    return new SHA(level, type)
  }
}

// hy.encrypt.sha().update("1");
// let hashing = hy.encrypt.sha().getHash("HEX");
// console.log(hashing);

// let shaObj = hy.encrypt.sha()
// shaObj.setHMACKey("abc", "TEXT");
// shaObj.update("1");
// let hmac = shaObj.getHMAC("HEX");
// console.log(hmac);
