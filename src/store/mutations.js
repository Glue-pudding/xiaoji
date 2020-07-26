import * as types from './types'
export default {
  // 获取左侧菜单是否展开
  [types.SETSIDEBARFOLD](state, sidebarFold) {
    state.sidebarFold = sidebarFold
  }
}
