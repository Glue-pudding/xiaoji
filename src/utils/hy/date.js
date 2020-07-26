/* eslint-disable */
import calandar from './utils/lunarCalandar';

const dateFormat = (date, format = "YYYY-MM-DD HH:mm:ss") => {
  if (!date) {
    return "";
  }
  if (typeof date === "string") {
    date = new Date(date.replace(/-/g, "/"));
  }
  if (typeof date === "number") {
    date = new Date(date);
  }
  var o = {
    "Y+": date.getFullYear(),
    "M+": date.getMonth() + 1,
    "D+": date.getDate(),
    "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  var week = {
    "0": "\u65e5",
    "1": "\u4e00",
    "2": "\u4e8c",
    "3": "\u4e09",
    "4": "\u56db",
    "5": "\u4e94",
    "6": "\u516d"
  };
  if (/(Y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  if (/(E+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (RegExp.$1.length > 1 ?
        RegExp.$1.length > 2 ?
        "\u661f\u671f" :
        "\u5468" :
        "") + week[date.getDay() + ""]
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
};

// 当前时间的时间戳 包含 ms
const timestamp = () => {
  return new Date().getTime();
};
// 将时间转换为时间戳 '2014-04-23 18:55:49:123'
const date2ts = val => {
  let date = new Date(val);
  return date.getTime();
};
// 将时间戳转换为日期
const ts2date = (val, format = "YYYY-MM-DD HH:mm:ss") => {
  if (typeof val !== "number") {
    return;
  }
  let ts = `${val}`.length === 10 ? val * 1000 : val;
  return dateFormat(ts, format);
};

const today = (format = "YYYY-MM-DD HH:mm:ss") => {
  let date = new Date();
  return dateFormat(date, format);
};

const days = year => {
  return [31, (year % 4 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};

const week = (year, month, day) => {
  let wk = [7, 1, 2, 3, 4, 5, 6];
  if (!day || !month || !year) {
    console.error("参数不全，无法判断");
    return;
  }
  return wk[new Date(+year, +month - 1, +day).getDay()];
};

const isWeek = (year, month, day) => {
  if (week(year, month, day) === 7 || week(year, month, day) === 6) {
    return true;
  }
  return false;
};

const daysAgo = (num, date = new Date()) => {
  let ts = date2ts(date);
  return ts2date(ts + num * 60 * 60 * 24 * 1000);
};

const weeksAgo = (num, date = new Date()) => {
  return daysAgo(num * 7, date);
};

const dateRange = (
  start = "2000-01-01",
  end = "2050-01-01",
  format = "YYYY-MM-DD"
) => {
  let dr = [];
  let st = new Date(start).getTime();
  let et = new Date(end).getTime();
  while (st <= et) {
    dr.push(dateFormat(st, format));
    st += 24 * 60 * 60 * 1000;
  }
  return dr;
};

const time = (ts = 0) => {
  if (typeof ts != "number") {
    throw Error("time is not number");
    return;
  }
  if (ts === 0) {
    return "00:00";
  }
  let mtime = parseInt(ts);
  let h = Math.floor(mtime / 3600);
  let m = `000${Math.floor((mtime - h * 3600) / 60)}`
    .split("")
    .reverse()
    .slice(0, 2)
    .reverse()
    .join("");
  let s = `000${mtime - h * 3600 - m * 60}`
    .split("")
    .reverse()
    .slice(0, 2)
    .reverse()
    .join("");
  let str = h ? `${h}:${m}:${s}` : `${m}:${s}`;
  return str;
};

const friendlyTime = (time, format = "YYYY-MM-DD HH:mm:ss") => {
  let date =
    typeof time === "number" ?
    new Date(time) :
    new Date((time || "").replace(/-/g, "/"));
  let diff = (new Date().getTime() - date.getTime()) / 1000;
  let dayDiff = Math.floor(diff / 86400);

  let isValidDate =
    Object.prototype.toString.call(date) === "[object Date]" &&
    !isNaN(date.getTime());

  if (!isValidDate) {
    console.error("not a valid date");
  }

  if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
    return dateFormat(date, format);
  }

  return (
    (dayDiff === 0 &&
      ((diff < 60 && "刚刚") ||
        (diff < 120 && "1分钟前") ||
        (diff < 3600 && Math.floor(diff / 60) + "分钟前") ||
        (diff < 7200 && "1小时前") ||
        (diff < 86400 && Math.floor(diff / 3600) + "小时前"))) ||
    (dayDiff === 1 && "昨天") ||
    (dayDiff < 7 && dayDiff + "天前") ||
    (dayDiff < 31 && Math.ceil(dayDiff / 7) + "周前")
  );
};

const invalidToDate = (time) => {
  time = time.replace(/-/g, ':').replace(' ', ':');
  time = time.split(':');
  return new Date(time[0], (time[1] - 1), time[2], time[3] || 0, time[4] || 0, time[5] || 0)
}

const solar = (year,month,day,leap)=> {
  return calandar.lunar2solar(year,month,day,leap)
}

export default {
  timestamp,
  date2ts,
  ts2date,
  dateFormat,
  today,
  days,
  week,
  isWeek,
  daysAgo,
  weeksAgo,
  dateRange,
  time,
  friendlyTime,
  invalidToDate,
  solar
};
