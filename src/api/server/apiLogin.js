/**
 * 登录服务，单点登录
 */

// 后端服务项目名，路径的默认前缀
const projectPath = 'hyitframeworks-comp-cas-war'

// login 获取accessToken
export const login = (host, prefix = projectPath, suffix = '') =>
  host + prefix + '/login' + suffix
