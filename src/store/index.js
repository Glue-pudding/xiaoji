import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

import state from './state'
import mutations from './mutations'
import getters from './getters'

import modules from './modules'

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  // 在开发环境中开启 严格模式 在严格模式下，只要 Vuex 状态在 mutation
  // 方法外被修改就会抛出错误。这确保了所有状态修改都会明确的被调试工具跟踪。 在生产环境中要 关闭严格模式  严格模式会对状态树进行深度监测来检测不合适的修改
  // —— 确保在发布阶段关闭它避免性能损耗。
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  // 全局性对象
  state,
  mutations,
  getters,
  // 模块 管理
  modules: modules
})
