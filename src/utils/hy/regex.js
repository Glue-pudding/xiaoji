/* eslint-disable */
// 手机号码 验证
const phoneNumber = phoneNumber => {
  // 中国移动
  const cm = phoneNumber => {
    let reg = /^1(34[0-8]|(3[5-9]|5[017-9]|78|98|8[2-478])\d)\d{7}$/;
    let regex = new RegExp(reg);
    let isPhoneNumber = regex.test(phoneNumber);
    return isPhoneNumber;
  };
  // 中国联通
  const cu = phoneNumber => {
    let reg = /^1(3[0-2]|5[256]|76|66|8[56])\d{8}$/;
    let regex = new RegExp(reg);
    let isPhoneNumber = regex.test(phoneNumber);
    return isPhoneNumber;
  };
  // 中国电信
  const ct = phoneNumber => {
    let reg = /^1((33|53|77|99|8[019])[0-9]|349)\d{7}$/;
    let regex = new RegExp(reg);
    let isPhoneNumber = regex.test(phoneNumber);
    return isPhoneNumber;
  };
  // 其他
  const other = phoneNumber => {
    let reg = /^1(3[0-9]|5[0-35-9]|70|8[0-9])\d{8}$/;
    let regex = new RegExp(reg);
    let isPhoneNumber = regex.test(phoneNumber);
    return isPhoneNumber;
  };
  let info = {};
  cm(phoneNumber)
    ? (info = { phoneNumber: true, serviceProvider: "中国移动" })
    : cu(phoneNumber)
      ? (info = { phoneNumber: true, serviceProvider: "中国联通" })
      : ct(phoneNumber)
        ? (info = { phoneNumber: true, serviceProvider: "中国电信" })
        : other(phoneNumber)
          ? (info = { phoneNumber: true, serviceProvider: "其他服务商" })
          : (info = { phoneNumber: false, serviceProvider: "" });
  return info;
};

// 邮箱验证
const email = val => /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val);

// ip验证
const isIp = val => /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i.test(val);

// 判断是否是时间 YYYY-MM-DD
const isDate = val =>  /\d{4}-\d{1,2}-\d{1,2}/.test(val);

// 判断是否是URL
const isUrl = val => /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(val);

// 判断字符串中是否含有中文
const isEN = val => /^[\u3220-\uFA29]+$/.test(val);

// 整数
const isInt = val => /^-?\d+$/.test(val);
// 正整数
const isSignleInt = val => /^\d+$/.test(val);
// 负整数
const isNegtiveInt = val => /^((-\d+)|(0+))$/.test(val);

// 判断是否是浮点数
const isFloat = val => /^(-?\d+)(\.\d+)?$/.test(val);
// 正浮点数
const isSignleFloat = val =>
  /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test(
    val
  );
// 负浮点数
const isNegtiveFloat = val =>
  /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(
    val
  );

// 26个字母组成
const isAz = val => /^[A-Za-z]+$/.test(val);
// 26个字母 全部大写
const isAZ = val => /^[A-Z]+$/.test(val);
// 26个字母 全部小写
const isaz = val => /^[A-Z]+$/.test(val);

// 银行卡号判断
const isBankcard = val => /^\\d{15,19}$/.test(val);

// 邮政编码验证
const isPostalCode = val => /^[1-9]\d{5}$/.test(val);

export default {
  phoneNumber,
  email,
  isIp,
  isDate,
  isUrl,
  isEN,
  isInt,
  isSignleInt,
  isNegtiveInt,
  isFloat,
  isSignleFloat,
  isNegtiveFloat,
  isAz,
  isAZ,
  isaz,
  isBankcard,
  isPostalCode
};
