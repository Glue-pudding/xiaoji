import Vue from 'vue'
// import 'babel-polyfill'
require('es6-promise').polyfill()
// 工具函数集
import './utils'

// 样式
import 'normalize.css/normalize.css'
import './assets/styles/style.scss'

// element
import element from 'element-ui'
Vue.use(element)

// iconfont
// import './assets/font/iconfont.css'
import './assets/styles/icon/iconfont.css'
// root组件
import App from './App'

// 路由
import router from './router'

// vuex 状态管理
import store from './store'

// 中间件和项目的基础配置
import config from './config'
Object.keys(config).map(e => {
    if (e === 'isMock') {
        /**
         * 第一个参数 是否使用mock数据
         * 第二个参数 网络请求 是否使用 JSON
         */
        Vue.use(config[e], false, true)
    } else {
        Vue.use(config[e])
    }
})
//引入eachrts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false

var vue = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})

export default vue

window.vue = vue
