/* eslint-disable */
const base = {
  // 随机数
  random() {
    return Math.random();
  },
  // 在最大值和最小值之间的随机数
  randomAmong(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  // 浮点数取整 也可以使用 Math.trunc()
  float2int(num) {
    if (typeof num === "number") {
      let str = `${num}`;
      let arr = [];
      if (str.includes(".")) {
        arr = str.split(".");
        return arr[0];
      }
      return num;
    } else if (typeof num === "string") {
      let strNum = +num;
      if (strNum !== strNum) {
        console.error(`${num}:数据类型不能取整`);
        return 0;
      } else {
        let arr = [];
        if (num.includes(".")) {
          arr = num.split(".");
          return arr[0];
        }
        return +num;
      }
    } else {
      console.error(`${num}:数据类型不能取整`);
      return 0;
    }
  },
  // 四舍五入
  round(num) {
    if (typeof num === "number") {
      return Math.round(num);
    } else if (typeof num === "string") {
      let strNum = +num;
      if (strNum !== strNum) {
        console.error(`${num}:数据类型不能四舍五入`);
        return 0;
      } else {
        return Math.round(num);
      }
    } else {
      console.error(`${num}:数据类型不能四舍五入`);
      return 0;
    }
  },
  uuid(len = 15) {
    let str =
      Math.random()
      .toString(36)
      .substr(2, 15) +
      Math.random()
      .toString(36)
      .substr(2, 15) +
      Math.random()
      .toString(36)
      .substr(2, 15) +
      Math.random()
      .toString(36)
      .substr(2, 15) +
      Math.random()
      .toString(36)
      .substr(2, 15) +
      Math.random()
      .toString(36)
      .substr(2, 15) +
      Math.random()
      .toString(36)
      .substr(2, 15) +
      Math.random()
      .toString(36)
      .substr(2, 15);
    if (str.length < len) {
      console.warn(`uuid的长度不能大于${str.length}`);
    }
    return str.slice(0, len);
  },
  // 随机颜色 十六进制
  randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  },
  // 将十六进制转换为RGB
  // 转换格式 #FFF #FFFF #FFFFFF
  toRGB(color, getValue = false) {
    let mColor = "";
    if (/#/i.test(color)) {
      if (color.length === 3) {
        mColor = color.repeat(2);
      } else if (color.slice(1).length === 3) {
        mColor = color.slice(1).repeat(2);
      } else if (color.slice(1).length === 6) {
        mColor = color.slice(1);
      }
    } else {
      mColor = color;
    }
    if (getValue) {
      return [
        parseInt(mColor, 16) >> 16,
        (parseInt(mColor, 16) >> 8) & 255,
        parseInt(mColor, 16) & 255
      ];
    }
    return `rgb(${parseInt(mColor, 16) >> 16},${(parseInt(mColor, 16) >> 8) &
      255},${parseInt(mColor, 16) & 255})`;
  },
  // 将颜色值转换为十六进制
  toHex(red, green, blue) {
    return `#${(blue | (green << 8) | (red << 16) | (1 << 24))
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  },
  // 去除字符串中空格
  trimAll(str) {
    return str.replace(/\s+/g, "");
  },
  // 将字符串数字转换为数字
  toNumber(val) {
    if (typeof val === "string") {
      let num = +val;
      if (num !== num) {
        if (/(.)/g.test(val)) {
          let fnum = parseFloat(val);
          if (fnum !== fnum) {
            console.error(`${typeof val} 不能转换为数字类型 `);
          }
          return fnum;
        } else {
          let inum = parseInt(val);
          if (inum !== inum) {
            console.error(`${typeof val} 不能转换为数字类型 `);
          }
          return inum;
        }
      } else {
        return num;
      }
    } else if (typeof val === "number") {
      return val;
    } else {
      console.error(`${typeof val} 不能转换为数字类型 `);
      return 0.0;
    }
  },
  // 重复字符串 生成数组
  repeatArr(str, len) {
    let arr = `-${str}`.repeat(len).split("-");
    arr.shift();
    return arr;
  },
  // 金融数字 每3位逗号分隔
  comma(val, len = 3) {
    val = String(val).split(".");
    val[0] = val[0].replace(
      new RegExp("(\\d)(?=(\\d{" + len + "})+$)", "ig"),
      "$1,"
    );
    return val.join(".");
  },
  // 指定位数 数字前面补全0
  pad(val, len = 2) {
    let pre = "";
    const negative = val < 0;
    const string = String(Math.abs(val));
    if (string.length < len) {
      pre = new Array(len - string.length + 1).join("0");
    }
    return (negative ? "-" : "") + pre + string;
  },
  // 指定范围 并且自动补全
  range(start, end, padWidth = 2) {
    const rg = [];
    while (start <= end) {
      rg.push(padWidth ? this.pad(start, padWidth) : start);
      start++;
    }
    return rg;
  },
  // 数据安全类型检查
  prototype(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  },
  isNaN(val) {
    return val !== val;
  },
  isString(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === "String";
  },
  isNumber(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === "Number";
  },
  isArray(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === "Array";
  },
  isObject(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === "Object";
  },
  isFunction(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === "Function";
  },
  isDate(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === "Date";
  },
  // URL参数转换成JSON
  query: (search = window.location.search) =>
    ((querystring = "") =>
      (q => (
        querystring
        .split("&")
        .forEach(item =>
          (kv => kv[0] && (q[kv[0]] = kv[1]))(item.split("="))
        ),
        q
      ))({}))(search.split("?")[1]),
  // 检测是否是质数
  isPrime: val => !/^.?$|^(..+?)\1+$/.test("1".repeat(val)),
  // 检测字符串中每个字符出现的次数
  repeatedly: val =>
    val.split("").reduce((p, k) => (p[k]++ || (p[k] = 1), p), {}),
  // 统计文字个数
  wordCount: data => {
    var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
    var m = data.match(pattern);
    var count = 0;
    if (m === null) return count;
    for (var i = 0; i < m.length; i++) {
      if (m[i].charCodeAt(0) >= 0x4e00) {
        count += m[i].length;
      } else {
        count += 1;
      }
    }
    return count;
  },
  isColor(val) {
    const colorReg = /^#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/;
    const rgbaReg = /^[rR][gG][bB][aA]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){3}\s*(\.|\d+\.)?\d+\s*\)$/;
    const rgbReg = /^[rR][gG][bB]\(\s*((25[0-5]|2[0-4]\d|1?\d{1,2})\s*,\s*){2}(25[0-5]|2[0-4]\d|1?\d{1,2})\s*\)$/;
    return colorReg.test(val) || rgbaReg.test(val) || rgbReg.test(val);
  },
  // URI解码
  decode: decodeURIComponent,
  // URI编码
  encode: encodeURIComponent,
  arrCopy(arr) {
    if (Object.prototype.toString.call(arr).slice(8, -1) === "Array") {
      return [].slice.call(JSON.parse(JSON.stringify(arr)));;
    }
    console.log(`${arr} 不是数组`);
    return [];
  },
  objCopy(obj) {
    if (Object.prototype.toString.call(obj).slice(8, -1) === "Object") {
      return JSON.parse(JSON.stringify(obj));
    }
    console.log(`${obj} 不是对象`);
    return {};
  },
  isEven(val) {
    if (+val !== +val) {
      console.log(`${val} 不是number类型`);
      return false;
    }
    if (val % 2 == 0) {
      return true;
    }
    return false;
  },
  arrDisEmpty(arr) {
    return arr.filter(e => {
      let dataType = Object.prototype.toString.call(e).slice(8, -1);
      if (dataType === "String") {
        return e && e.length > 0;
      }
      if (dataType === "Array") {
        return e.length > 0;
      }
      if (dataType === "Object") {
        return e && Object.keys(e).length > 0;
      }
      return true;
    });
  },
  objDisEmpty(obj) {
    for (let i in obj) {
      if (obj[i] == null || obj[i] === '' || obj[i] !== obj[i]) {
        delete obj[i]
      }
    }
    return obj;
  },
  throttle(method, time = 50, self, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(() => {
      method.call(self, context);
    }, time);
  },
  dataToURL(file) {
    if (!file) {
      return
    }
    const URL = window.URL || window.webkitURL || window.mozURL
    return URL.createObjectURL(file)
  },
  numRange(start, end) {
    const rg = [];
    while (start <= end) {
      rg.push(start);
      start++;
    }
    return rg;
  },
  aLowerCase(str) {
    return str.substring(0, 1).toLowerCase() + str.substring(1)
  },
  aUpperCase() {
    return str.substring(0, 1).toUpperCase() + str.substring(1)
  },
  humpTo(str) {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase()
  },
  toHump(str) {
    return str.replace(/-(\w)/g, function (all, letter) {
      return letter.toUpperCase()
    });
  }


};

export default base;
