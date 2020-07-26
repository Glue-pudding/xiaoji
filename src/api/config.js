export default {
  projectName: '华云集团-开发框架V2.0',
  devHost: {
    'oms': 'http://oms.zj-int-energy.com/'
  },
  integHost: 'integ/',
  prodHost: 'prod/',
  getHost: function(env) {
    if (env === 'development') {
      return this.devHost
    } else if (env === 'production') {
      return this.prodHost
    } else {
      return this.integHost
    }
  }
}
