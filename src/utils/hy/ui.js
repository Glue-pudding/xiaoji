/* eslint-disable */
export default {
  rect(el) {
    return el && el.getBoundingClientRect();
  },
  offset(el) {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  },
  styleValue(elm, attr) {
    if (!elm) {
      console.error(`${elm} 不存在`);
    }
    return window.getComputedStyle(elm, null)[attr];
  },
  dataAtt(el, name, val) {
    let prefix = "data-";
    if (val) {
      return el.setAttribute(prefix + name, val);
    }
    return el.getAttribute(prefix + name);
  },
  hasClass(el, className) {
    let reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
    return reg.test(el.className);
  },
  addClass(el, className) {
    let reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
    if (reg.test(el.className)) {
      return;
    }
    let newClass = el.className.split(" ");
    newClass.push(className);
    el.className = newClass.join(" ");
  },
  removeClass(el, className) {
    let reg1 = new RegExp("(^|\\s)" + className + "(\\s|$)");
    if (!reg1.test(el.className)) {
      return;
    }
    let reg2 = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
    el.className = el.className.replace(reg2, " ");
  },
  cleanStyle(styles = {}) {
    for (let i in styles) {
      if (typeof styles[i] === "undefined" || styles[i] !== styles[i]) {
        delete styles[i];
      }
    }
    return styles;
  },
  scrollView(el, target) {
    if (target) {
      return document.querySelector(target);
    }
    let currentNode = el;
    while (
      currentNode &&
      currentNode.tagName !== "HTML" &&
      currentNode.tagName !== "BODY" &&
      currentNode.nodeType === 1
    ) {
      let overflowY = document.defaultView.getComputedStyle(currentNode)
        .overflowY;
      if (overflowY === "scroll" || overflowY === "auto") {
        return currentNode;
      }
      currentNode = currentNode.parentNode;
    }
    return window;
  },
  scrollTop(el) {
    if (el === window) {
      return el.scrollY;
    } else {
      return el.scrollTop;
    }
  },
  scrollToTop(el, y = 0, offset = 0, duration = 500, cb) {
    if (!el) {
      return;
    }
    let _containerScrollY = y;
    let distance = y - offset;
    let timeStart, timeElapsed, next;
    hy.animate.requestAnimFrame((time, id, cancel) => {
      if (!timeStart) {
        timeStart = time / 60 * 1000;
      }
      timeElapsed = time / 60 * 1000 - timeStart;
      next = hy.animate.easeInOutQuad(timeElapsed, 0, distance, duration) || 0;
      if (el === window) {
        window.scrollTo(0, _containerScrollY - next);
      } else {
        el.scrollTop = _containerScrollY - next;
      }
      if (_containerScrollY - next <= offset || timeElapsed >= duration) {
        cancel(id);
        if (cb) {
          cb();
        }
      }
    });
  },
  on(el, event, fun, parm = true) {
    if (!el || !event || !fun) {
      return;
    }
    el.addEventListener(event, fun, parm);
  },
  off(el, event, fun, parm = true) {
    if (!el || !event || !fun) {
      return;
    }
    el.removeEventListener(event, fun, parm);
  },
  preventBubble(el) {
    el.preventDefault();
    el.stopPropagation();
  },
  pageScroll(el) {
    let locking = false;
    return {
      lock() {
        if (locking) {
          return;
        }
        locking = true;
        (el || document).addEventListener(
          "touchmove",
          hy.ui.preventBubble
        );
      },
      unlock() {
        locking = false;
        (el || document).removeEventListener(
          "touchmove",
          hy.ui.preventBubble
        );
      }
    };
  },
  dbclickEnlarge() {
    var lastTouchEnd = 0;
    const event = event => {
      var now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    };
    return {
      start() {
        document.documentElement.addEventListener("touchend", event, false);
      },
      stop() {
        document.documentElement.removeEventListener("touchend", event, false);
      }
    };
  }
};
