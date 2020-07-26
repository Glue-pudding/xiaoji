import '../utils'
import api from '../api'
import './requireAuth'
import HyNetworking from './network'

const middlewares = Vue => {
  Vue.prototype.$api = api.api
  Vue.prototype.$conf = api.conf
  Vue.prototype.$ebus = Vue.prototype.$ebus || new Vue()
}

const autoMock = () => {
  if (process.env.NODE_ENV === 'development') {
    require('./mock')
  } else {
    console.log('生产环境')
  }
}

const isMock = (Vue, ismock, restful) => {
  if (process.env.NODE_ENV === 'development') {
    if (ismock) {
      autoMock()
      const success = [
        'background: green',
        'color: white',
        'display: block',
        'text-align: center',
        'padding: 10px'
      ].join(';')

      // 注意前面的 %c 必须有 才能显示出颜色
      console.info('%c Mock数据已开启', success)
    }
  }

  const hyNetWork = new HyNetworking(process.env.NODE_ENV === 'development' ? ismock : false, restful)
  window.hyNetWork = hyNetWork
}

export default {
  middlewares,
  isMock
}
