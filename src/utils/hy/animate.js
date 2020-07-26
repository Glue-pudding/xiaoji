/* eslint-disable */
const easeInOutCubic = pos => {
  return (pos /= 0.5) < 1 ?
    0.5 * Math.pow(pos, 3) :
    0.5 * (Math.pow(pos - 2, 3) + 2);
};
const easeOutCubic = pos => {
  return Math.pow(pos - 1, 3) + 1;
};
const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

const requestAnimFrame = fun => {
  window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    (callback => setTimeout(callback, 1000 / 60));
  var id = null;
  var timer = 0;
  (function anim() {
    timer++;
    id = window.requestAnimFrame(anim);
    fun(timer, id, window.cancelAnimationFrame);
  })();
};

export default {
  easeInOutCubic,
  easeOutCubic,
  easeInOutQuad,
  requestAnimFrame
};
