export default {
    state: {
      token: '',
      userInfo: '',
      roles: [],
      pageType: ''
    },
    getters: {
      // token: state => state.token,
      // userInfo: state => state.userInfo,
      // roles: state => state.roles
      // 用户中心获取传来的"页码'
      getPageType: state => state.pageType
    },
    actions: {
      saveToken({
        commit
      }, token, expires) {
        commit('SAVE_TOKEN', token, expires)
      },
      saveUserInfo({
        commit
      }, userInfo) {
        commit('SAVE_USERINFO', userInfo)
      },
      saveRoles({
        commit
      }, roles) {
        commit('SAVE_ROLES', roles)
      },
      clearUserInfo({
        commit
      }) {
        commit('SAVE_TOKEN', '')
        commit('SAVE_USERINFO', '')
        commit('SAVE_ROLES', [])
      },
      saveUserMenuList({
        commit
      }, menuList) {
        commit('SAVE_USERMENULIST', menuList)
      },
      // 进入用户中心传的'页数'
      savePageType({
        commit
      }, pageType) {
        commit('SAVE_PAGETYPE', pageType)
      }
    },
    mutations: {
      SAVE_TOKEN(state, token, expires) {
        if (token) {
          hy.db.sessionStorage.setValue('token', token, {
            expires: expires
          })
        } else {
          hy.db.sessionStorage.remove('token')
        }
        state.token = token
      },
      SAVE_USERINFO(state, userInfo) {
        state.userInfo = userInfo
      },
      SAVE_ROLES(state, roles) {
        state.roles = roles
      },
      SAVE_PAGETYPE(state, pageType) {
        state.pageType = pageType
      }
    }
  }
