/* eslint-disable */
const na = navigator.appVersion;
const nu = navigator.userAgent;

const screen = {
  width: window.screen.width,
  height: window.screen.height,
  ratio: window.devicePixelRatio
};

const orientation = () => {
  switch (window.orientation) {
    case 0:
      return "up";
      break;
    case 90:
      return "left";
      break;
    case -90:
      return "right";
      break;
    case 180:
      return "down";
      break;
    default:
      break;
  }
  return "Unknown";
};

const isMobile = /(MOBILE)/i.test(na.toUpperCase());
const isIos = /(iPhone|iPod|ios|iPad)/i.test(na);
const isAndroid = /(Android)/i.test(na);
const platform = (() => {
  let arr = nu.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  ) || ["Unknown"];
  return arr[0];
})();
const version = (() => {
  if (/(iPhone|iPod|ios|iPad)/i.test(na)) {
    let str = nu.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
    if (str) {
      return str[1].replace(/_/g, ".");
    }
  } else if (/(Android)/i.test(na)) {
    let str = nu.toLowerCase().match(/android (.*?);/);
    if (str) {
      return str[1];
    }
  }
  return "Unknown";
})();

const browser = () => {
  if (nu.indexOf("Chrome") >= 0) {
    return {
      name: "Chrome",
      version: nu.match(/Chrome\/([\d.]+)/)[1]
    };
  } else if (nu.indexOf("Safari") >= 0) {
    return {
      name: "Safari",
      version: nu.match(/Version\/([\d.]+)/)[1]
    };
  } else if (nu.indexOf("Firefox") >= 0) {
    return {
      name: "Firefox",
      version: nu.match(/Firefox\/([\d.]+)/)[1]
    };
  } else {
    return {
      name: "Other",
      version: "Unknown"
    };
  }
};

const language = navigator.language;

export default {
  screen,
  orientation,
  isMobile,
  isIos,
  isAndroid,
  platform,
  version,
  browser,
  language
};
