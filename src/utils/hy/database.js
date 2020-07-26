/* eslint-disable */
const cookie = {
  enabled: () => navigator.cookieEnabled,
  remove(key) {
    document.cookie = key + "=" + "";
  },
  keys() {
    let arr = document.cookie.split("; ");
    return arr.map(e => e.split("=")[0]);
  },
  values() {
    let arr = document.cookie.split("; ");
    return arr.map(e => e.slice(e.indexOf('=')+1));
  },
  setValue: (key, value, options) => {
    var text = key + "=" + value;
    options = options || {};
    var expires = options["expires"];
    var domain = options["domain"];
    var path = options["path"];
    // expires
    var date = expires;
    if (typeof date === "number") {
      date = new Date();
      date.setTime(date.getTime() + expires)
      text += "; expires=" + date.toUTCString();
    }
    if (date instanceof Date) {
      text += "; expires=" + date.toUTCString();
    }
    // domain
    if (domain) {
      text += "; domain=" + domain;
    }
    // path
    if (path) {
      text += "; path=" + path;
    }
    // secure
    if (options["secure"]) {
      text += "; secure";
    }
    document.cookie = text;
  },
  getValue: key => {
    let arr = document.cookie.split("; ");
    let val = arr.filter(e => e.startsWith(key));
    if (val.length) {
      return val[0].slice(val[0].indexOf('=') + 1);
    }
    return null;
  }
};

const localStorage = {
  clear() {
    window.localStorage.clear();
  },
  setValue(key, value) {
    let data = ''
    if (hy.base.isArray(value) || hy.base.isObject(value)) {
      data = JSON.stringify(value)
    } else {
      data = value
    }
    try {
      window.localStorage.setItem(key, data)
    } catch (error) {
      console.log(error)
    }
  },
  getValue(key) {
    return window.localStorage.getItem(key);
  },
  remove(key) {
    window.localStorage.removeItem(key);
  }
};
const sessionStorage = {
  setValue(key, name) {
    window.sessionStorage.setItem(key, name);
  },
  getValue(key) {
    return window.sessionStorage.getItem(key);
  },
  remove(key) {
    window.sessionStorage.removeItem(key);
  },
  clear() {
    window.sessionStorage.clear();
  }
};

export default {
  cookie,
  localStorage,
  sessionStorage
};
