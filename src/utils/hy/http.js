/* eslint-disable */
// const axios = require("./utils/axios").axios;

// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

// const defaultHeaders = {
//   Accept: "application/json, text/plain, */*; charset=utf-8",
//   // "Content-Type": "application/json; charset=utf-8",
//   // Pragma: "no-cache",
//   // "Cache-Control": "no-cache"
// };

// var axiosInstance = axios.create({
//   timeout: 20 * 1000,
//   headers: Object.assign(axios.defaults.headers.common, defaultHeaders)
// });

// axiosInstance.interceptors.request.use(
//   config => {
//     config._reqeustStartTimestamp = Date.now();
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
