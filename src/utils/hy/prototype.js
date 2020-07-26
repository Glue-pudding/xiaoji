/* eslint-disable */
import calandar from './utils/lunarCalandar';

Array.prototype.unique = function () {
  var json = {},newArr = [],len = this.length;
  for (var i = 0; i < len; i++) {
    var temp = Object.prototype.toString.call(this[i]);
    if (typeof json[this[i]] == "undefined") {
      json[this[i]] = {};
      json[this[i]][temp] = 1;
      newArr.push(this[i]);
    } else if (typeof json[this[i]][temp] == "undefined") {
      json[this[i]][temp] = 1;
      newArr.push(this[i]);
    } else {
      json[this[i]][temp]++;
    }
  }
  return newArr;
}

Array.prototype.bunique = function () {
  return [...new Set(this)]
}

Array.prototype.ssort = function () {
  return this.sort((x, y) => {
    if (x < y) {
      return -1;
    } else if (x > y) {
      return 1;
    } else {
      return 0;
    }
  })
}

Array.prototype.bsort = function () {
  return this.sort((x, y) => {
    if (x < y) {
      return 1;
    } else if (x > y) {
      return -1;
    } else {
      return 0;
    }
  })
}

Array.prototype.copy = function () {
  return [].slice.call(JSON.parse(JSON.stringify(this)));
}

Array.prototype.exist = function (params) {
  if (!this && !this.length) {
    return
  }
  let res = this.find(e => {
    if (hy.base.prototype(e) === hy.base.prototype(params)) {
      if (hy.base.isDate(e)) {
        return e.getTime() === params.getTime();
      }
      if (hy.base.isArray(e) || hy.base.isObject(e)) {
        return e.toString() === params.toString();
      }
      return e === params;
    }
    return false
  })
  return ~~res
}

Array.prototype.remove = function (params) {
  return this && this.filter(e => {
    if (hy.base.prototype(e) === hy.base.prototype(params)) {
      if (hy.base.isDate(e)) {
        return e.getTime() !== params.getTime();
      }
      if (hy.base.isArray(e) || hy.base.isObject(e)) {
        return e.toString() !== params.toString();
      }
      return e !== params;
    }
    return false
  })
}
Date.prototype.format = function (fmt) {
  let o = {
    "Y+": this.getFullYear(),
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, //小时
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  }
  let week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[this.getDay() + ''])
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

Date.prototype.setISO8601 = function (string) {
  let regexp = '([0-9]{4})(-([0-9]{2})(-([0-9]{2})' +
    '(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?' +
    '(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?'
  if (string) {
    let d = string.match(new RegExp(regexp))
    let offset = 0
    let date = new Date(d[1], 0, 1)

    if (d[3]) {
      date.setMonth(d[3] - 1)
    }
    if (d[5]) {
      date.setDate(d[5])
    }
    if (d[7]) {
      date.setHours(d[7])
    }
    if (d[8]) {
      date.setMinutes(d[8])
    }
    if (d[10]) {
      date.setSeconds(d[10])
    }
    if (d[12]) {
      date.setMilliseconds(Number('0.' + d[12]) * 1000)
    }
    if (d[14]) {
      offset = (Number(d[16]) * 60) + Number(d[17])
      offset *= ((d[15] === '-') ? 1 : -1)
    }
    offset -= date.getTimezoneOffset()
    let time = (Number(date) + (offset * 60 * 1000))
    this.setTime(Number(time))
  }
}

Date.prototype.dateFormat = function (fmt = 'yyyy-MM-dd') {
  return this && this.format(fmt)
}

Date.prototype.lunar = function () {
  return calandar.solar2lunar(this.getFullYear(),this.getMonth() + 1, this.getDate())
}
