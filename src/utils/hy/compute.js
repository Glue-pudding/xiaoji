/* eslint-disable */
const array = args => {
  return [...args].map(e => `${e}`).map(e => e.split("."));
};

const maxDigit = args => {
  let arr = array(args).filter(e => e.length === 2);
  return Math.max(
    ...(arr.length ? arr.map(e => e[1]).map(e => e.length) : [0])
  );
};

const add = (...args) => {
  let arr = array(args);
  let maxLen = maxDigit(args);
  let intNum = arr.map(e => +e[0]).reduce((x, y) => x + y);
  let digitNum = arr
    .filter(e => e.length === 2)
    .map(e => e[1])
    .map(e => {
      let num = maxLen - e.length;
      return +e * Math.pow(10, num);
    });
  digitNum = digitNum.length ? digitNum.reduce((x, y) => x + y) : 0;
  if (`${digitNum}`.length > maxLen) {
    let dint = +`${digitNum}`.substr(0, `${digitNum}`.length - maxLen);
    let dig = +`${digitNum}`.substr(`${digitNum}`.length - maxLen);
    return +`${intNum + dint}.${dig}`;
  }
  return +`${intNum}.${digitNum}`;
};

const sub = (...args) => {
  let maxLen = maxDigit(args);
  let arr = [...args]
    .map(e => e * Math.pow(10, maxLen))
    .reduce((x, y) => x - y);
  return arr * Math.pow(10, -maxLen);
};

const mul = (...args) => {
  let maxLen = maxDigit(args);
  let arr = [...args]
    .map(e => +e * Math.pow(10, maxLen))
    .reduce((x, y) => x * y);
  return arr * Math.pow(10, -maxLen * args.length);
};
const div = (...args) => {
  if (args.some((e, i) => i !== 0 && e === 0)) {
    return console.error("除数不能是0");
  }
  let maxLen = maxDigit(args);
  let arr = [...args].reduce((x, y) => Math.imul(x,1/y));
  return arr;
};

export default {
  add,
  sub,
  mul,
  div
};
