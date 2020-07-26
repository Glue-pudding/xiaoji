import {
  MessageBox
} from 'element-ui'
import store from '../store'
import router from '../router'
const axios = require('../utils/hy/utils/axios').axios

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8'
  // Pragma: "no-cache",
  // "Cache-Control": "no-cache"
}

var axiosInstance = axios.create({
  timeout: 30 * 1000,
  headers: Object.assign(axios.defaults.headers.common, defaultHeaders)
})

axiosInstance.interceptors.request.use(
  config => {
    config._reqeustStartTimestamp = Date.now()
    if (store.state.user.accessToken || window.hy.db.sessionStorage.getValue('accessToken')) {
      config.headers['accessToken'] =
        store.state.user.accessToken || window.hy.db.sessionStorage.getValue('accessToken')
    }
    if (config.url.match(/\.json$/)) {
      config.headers['Content-Type'] = 'application/json; charset=utf-8'
    } else if (config.url.match(/hyitframeworks-comp-cas-war\/v1\/tickets/)) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
let errorCount = 0
axiosInstance.interceptors.response.use(
  response => {
    const data = response.data
    if (data.statusCode === '603') {
      ++errorCount
      if (errorCount === 1) {
        MessageBox.confirm(`${data.message}`, '登录超时，请求失败，请重新登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          store.dispatch('clearUserInfo').then(() => {
            router.push({
              path: '/login'
            })
          })
          errorCount = 0
        }).catch(() => {
          errorCount = 0
        })
      }
      return Promise.reject({
        code: '603',
        message: data.message
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  axiosInstance,
  axios
}
