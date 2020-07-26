const basePages = ['login', 'auth', '404', 'workBench', 'home']
const app = {
  state: {
    keepAlivePages: [],
    appInfo: {
      uuid: '',
      appId: ''
    },
    allPagesPath: basePages
  },
  actions: {
    keepAlivePages: ({ commit }, router) => {
      commit('KEEPALIVEPAGES', router)
    },
    appInfo: ({ commit }, info) => {
      commit('APPINFO', info)
    },
    saveAllPagesPath: ({ commit }, paths) => {
      commit('SAVEALLPAGESPATH', paths)
    }
  },
  mutations: {
    KEEPALIVEPAGES(state, router) {
      state.keepAlivePages = router.options.routes
        .filter(
          route => route.keepAlive || (route.meta && route.meta.keepAlive)
        )
        .map(route => route.name)
    },
    APPINFO(state, info) {
      state.appInfo = info
      if (info) {
        hy.db.cookie.setValue('appInfo', info)
        hy.db.cookie.setValue('appId', info.appId)
        hy.db.cookie.setValue('userId', info.uuid)
      } else {
        hy.db.cookie.remove('appInfo')
      }
    },
    SAVEALLPAGESPATH(state, paths) {
      state.allPagesPath = [...basePages, ...paths]
    }
  }
}

export default app
