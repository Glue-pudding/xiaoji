import { stat } from "fs"

const isActiveView = (item, to) => {
  const mRoute = to || this.$route
  return item.path === mRoute.path || item.title === mRoute.meta.title
}

const tabs = {
  namespaced: true,
  state: {
    tabsView: [{
      title: '首页',
      path: '/home'
    }, {
      title: '业务',
      path: '/home'
    }],
  },
  actions: {
    tabsViewRoute: ({
      commit
    }, router) => {
      commit('TABSVIEWROUTE', router)
    },
    tabsView: ({
      commit
    }, tabsView) => {
      commit('TABSVIEW', tabsView)
    }
  },
  mutations: {
    TABSVIEWROUTE(state, router) {
      if (!router.meta || !router.meta.title) {
        return
      }
      const tabsViewLen = state.tabsView.filter(e => isActiveView(e, router)).length
      if (tabsViewLen) {
        return
      }
      state.tabsView.push({
        title: router.meta.title,
        path: router.path
      })
    },
    TABSVIEW(state, tabsView) {
      state.tabsView = tabsView
    }
  }
}

export default tabs
