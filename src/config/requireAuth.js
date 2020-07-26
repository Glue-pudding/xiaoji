import router from '../router'
import store from '../store'

store.dispatch('keepAlivePages', router)

router.beforeEach((to, from, next) => {
    const obj = Object.assign({}, window.hy.tool.nprogress.settings, {
        color: '#1CB963',
        showSpinner: true
    })
    window.hy.tool.nprogress.settings = obj
    window.hy.tool.nprogress.start()

    store.dispatch('tabs/tabsViewRoute', to)

    // if (process.env.NODE_ENV === 'development') {
    //     next()
    //     return
    // }
    if (to.meta.requireAuth) {
        if (to.query.accessToken) hy.db.sessionStorage.setValue('token', to.query.accessToken)

        // 没有token, 但是有accessToken也可以通过(免登陆功能)
        if (store.state.user.token || window.hy.db.sessionStorage.getValue('userInfo') || to.query.accessToken) {
            next()
        } else {
            next({
              path: '/login'
            })
        window.hy.tool.nprogress.done()
        }
    } else {
        next()
    }
})

router.afterEach((to, from) => {
    window.hy.tool.nprogress.done()
})

export { router, store }
