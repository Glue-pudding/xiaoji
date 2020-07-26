/* eslint-disable */
import nprogress from "./utils/nprogress";
import miniType from "./utils/mime.json";
import {
  canvasToImg
} from './utils/canvas';

const miniTypes = (list = []) => {
  let arr = [];
  list &&
    list.map(e => {
      miniType.hasOwnProperty(`.${e}`) && arr.push(miniType[`.${e}`]);
    });
  return arr
};

// hy.tool.countDown(300,(time,stop)=>{
//   this.countDown = `${time.day}天 ${time.hour}时 ${time.minute}分 ${time.second}秒`
// },()=>{
//   console.log('stop')
// })

export const countDown = (times, start, stop) => {
  if (hy.base.isFunction(start)) {
    var timer = null;
    timer = setInterval(function () {
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0;
      if (times > 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - (day * 24);
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      }
      if (day <= 9) day = '0' + day;
      if (hour <= 9) hour = '0' + hour;
      if (minute <= 9) minute = '0' + minute;
      if (second <= 9) second = '0' + second;
      start({
        day: day,
        hour: hour,
        minute: minute,
        second: second
      }, () => {
        stop();
        clearInterval(timer);
      })
      times--;
    }, 1000);
    if (times <= 0) {
      stop()
      clearInterval(timer);
    }
  }
}
/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
const Debounce = (fn, t) => {
  let delay = t || 500;
  let timer;
  return function () {
    let args = arguments;
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  }
};
/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
const Throttle = (fn, t) => {
  let last;
  let timer;
  let interval = t || 500;
  return function () {
    let args = arguments;
    let now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, interval);
    } else {
      last = now;
      fn.apply(this, args);
    }
  }
};
const isSupportFontFamily = function(f) {
//    f是要检测的字体
  if(typeof f != "string") {
    return false
  }
//    h是基础字体
  var h = "Arial";
  if(f.toLowerCase() == h.toLowerCase()) {
    return true
  }
//    设置一个检测的字符A,看他是否支持f字体
  var e = "a";
  var d = 100;
  var a = 100,
    i = 100;
  var c = document.createElement("canvas");
  var b = c.getContext("2d");
  c.width = a;
  c.height = i;
  b.textAlign = "center";
  b.fillStyle = "black";
  b.textBaseline = "middle";
  var g = function(j) {
    b.clearRect(0, 0, a, i);
//        字体是传入的j,或者是默认的h
    b.font = d + "px " + j + ", " + h;
    b.fillText(e, a / 2, i / 2);
//        获取所有的canvas图片信息
    var k = b.getImageData(0, 0, a, i).data;
//        k调用数组的 filter方法,筛选符合条件的。改变原数组。
    return [].slice.call(k).filter(function(l) {
      return l != 0
    });
  };
//    返回结果,如果h默认字体和输入待检测字体f.通过g函数检测得到的字符串不一致,说明自提生效
  return    g(h).join("") !== g(f).join("");
}
// hy.tool.canvasToImg('to right' ,'Deep Purple' ,...['#67b26f', '#4ca2cd'])
export default {
  nprogress,
  miniTypes,
  canvasToImg,
  countDown,
  Debounce,
  Throttle,
  isSupportFontFamily
};

