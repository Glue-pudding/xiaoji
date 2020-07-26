import Vue from 'vue'
import Router from 'vue-router'
import { importPage, requirePage } from './router'
const asyncRouterPage = process.env.NODE_ENV === 'production' ? importPage : requirePage
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: asyncRouterPage('login'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/welcome',
    component: asyncRouterPage('welcome', 'views'),
    name: 'welcome',
    meta: {
      title: 'welcome',
      keepAlive: true
    },
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        component: asyncRouterPage('homePage'),
        meta: {
          hidden: true
        }
      },
      {
        path: '/energyPanorama',
        name: 'energyPanorama',
        component: asyncRouterPage('energyPanorama'),
        meta: {
          hidden: true
        }
      },
      {
        path: '/energySite',
        name: 'energySite',
        component: asyncRouterPage('energyArchive/energySite'),
        meta: {
          hidden: true
        }
      },
      {
        path: '/enterpriseUser',
        name: 'enterpriseUser',
        component: asyncRouterPage('energyArchive/enterpriseUser'),
        meta: {
          hidden: true
        },
      },
      {
        path: '/fileDetails',
        name: 'fileDetails',
        component: asyncRouterPage('energyArchive/enterpriseUser/fileDetails'),
        meta: {
          hidden: true
        }
      }, {
        path: '/energyMap',
        name: 'energyMap',
        component: asyncRouterPage('energyMap'),
        meta: {
          hidden: true
        }
      }

    ]
  },
  {
    path: '/404',
    component: asyncRouterPage('404'),
    meta: {
      hidden: true
    }
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history',
  // fallback: true,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: constantRouterMap
})
