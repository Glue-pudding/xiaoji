export default {
  appId: state => state.appId,
  token: state => state.token || window.hy.db.sessionStorage.getValue('token'),
  // 获取左侧菜单是否展开
  getSidebarFold: state => state.sidebarFold,
}
