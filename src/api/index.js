import conf from './config'
import serverAPI from './server/index'

const env = process.env.BUILD_ENV || process.env.NODE_ENV
const host = conf.getHost(env)
const api = {}

Object.keys(serverAPI).map(server => {
  Object.keys(serverAPI[server]).map(e => {
    var str = serverAPI[server][e]('')
    Object.keys(host).map(itemHost => {
      if (itemHost == str.substring(0, str.indexOf('^'))) {
        api[e] = host[itemHost] + str.substring(str.indexOf('^') + 1, str.length)
      }
    })
  })
})

export const API = api
export default {
  api,
  conf
}
