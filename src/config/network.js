const autoAddParms = parms => {
  if (process.env.NODE_ENV === 'development') {
    // parms && hy.base.isObject(parms) ? parms['user_id'] ? '' : parms['user_id'] = 'admin' : parms = {
    //   user_id: 'admin'
    // }
  }
  return parms
}
const getParams = (parms, isMock) => {
  let query = ''
  let log = ''
  parms = autoAddParms(parms)
  if (parms && hy.base.isString(parms)) {
    query = '/' + parms
    log = '动态参数'
  } else if (parms && hy.base.isArray(parms)) {
    if (hy.base.isObject(parms[parms.length - 1])) {
      query = '/' + parms.slice(0, -1).join('/') + '?' + hy.qs.stringify(hy.base.objDisEmpty(parms[parms.length - 1]))
    } else {
      query = '/' + parms.join('/')
    }
    log = '动态参数'
  } else if (parms && hy.base.isObject(parms) && Object.keys(parms).length) {
    query = '?' + hy.qs.stringify(hy.base.objDisEmpty(parms))
    log = '查询字符串参数'
  }
  if (isMock) {
    console.info(`Mock数据 ${log}:`, parms)
  }
  return query
}
const postParams = (parms, isMock, isJSON) => {
  parms = autoAddParms(parms)
  let dynamicParams = ''
  if (parms && hy.base.isObject(parms) && parms.hasOwnProperty('dynamicParams')) {
    const dyncParams = parms['dynamicParams'] || ''
    if (dyncParams && hy.base.isString(dyncParams)) {
      dynamicParams = '/' + dyncParams
    } else if (dyncParams && hy.base.isArray(dyncParams)) {
      dynamicParams = '/' + dyncParams.join('/')
    }
    delete parms.dynamicParams
    if (isMock) {
      console.info(`Mock数据 动态参数是:`, dyncParams)
    }
  }
  const queryStr = parms ? isJSON ? hy.base.objDisEmpty(parms) : hy.qs.stringify(hy.base.objDisEmpty(parms)) : {}
  return {
    dynamicParams,
    queryStr
  }
}
class HyNetworking {
  constructor(isMock = false, isJSON = true) {
    this.isMock = isMock
    this.isJSON = isJSON
    if (!this.isJSON) {
      const headers = hy.base.objCopy(hy.http.defaults.headers)
      if (headers['Accept'] === 'application/json, text/plain, */*; charset=utf-8') {
        delete headers.Accept
      }
      if (headers['Content-Type'] === 'application/json; charset=utf-8') {
        delete headers['Content-Type']
      }
      if (headers['common'] && headers['common']['Accept'] === 'application/json, text/plain, */*; charset=utf-8') {
        delete headers.common.Accept
      }
      if (headers['common'] && headers['common']['Content-Type'] === 'application/json; charset=utf-8') {
        delete headers.common['Content-Type']
      }
      hy.http.defaults.headers = headers
      hy.http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
      hy.http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      hy.http.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded'
    }
  }
  get(url, parms, isUrl) {
    let dynamicParams = ''
    if (parms && parms.dynamicParams) {
      dynamicParams = parms.dynamicParams
      delete parms.dynamicParams
    }
    const query = getParams(parms, this.isMock)
    return isUrl ? url + query : hy.http.get(url + (dynamicParams || '') + (this.isMock ? '' : query))
  }
  delete(url, parms, isUrl) {
    const query = getParams(parms, this.isMock)
    return isUrl ? url + query : hy.http.delete(url + (this.isMock ? '' : query))
  }
  head(url, parms, isUrl) {
    const query = getParams(parms, this.isMock)
    return isUrl ? url + query : hy.http.head(url + (this.isMock ? '' : query))
  }
  post(url, parms, headers = {}) {
    const {
      dynamicParams,
      queryStr
    } = postParams(parms, this.isMock, this.isJSON)
    return hy.http.post(url + (this.isMock ? '' : dynamicParams), queryStr, headers)
  }
  put(url, parms, headers = {}) {
    const {
      dynamicParams,
      queryStr
    } = postParams(parms, this.isMock, this.isJSON)
    return hy.http.put(url + (this.isMock ? '' : dynamicParams), queryStr, headers)
  }
  patch(url, parms, headers = {}) {
    const {
      dynamicParams,
      queryStr
    } = postParams(parms, this.isMock, this.isJSON)
    return hy.http.patch(url + (this.isMock ? '' : dynamicParams), queryStr, headers)
  }
  upload(url, files, fileName, progressCb, headers) {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append(fileName, files[i])
    }
    return hy.http.post(url, formData, {
      headers: headers || {
        'Content-Type': 'multipart/form-data'
      },
      [hy.base.isFunction(progressCb) ? 'onUploadProgress' : '']: progressEvent => {
        // 对原生进度事件的处理
        const loaded = progressEvent.loaded * 100 / progressEvent.total
        const progress = Math.ceil(loaded)
        progressCb(progress)
      }
    })
  }
  // 数据导入，导入图片用
  yzUploadAll(url, files, progressCb, headers) {
    const formData = new FormData();
    for(var i in files) {
      formData.append(i, files[i])
    }
    return hy.http.post(url, formData, {
      headers: headers || {
        'Content-Type': 'multipart/form-data'
      },
      [hy.base.isFunction(progressCb) ? 'onUploadProgress' : '']: progressEvent => {
        // 对原生进度事件的处理
        const loaded = progressEvent.loaded * 100 / progressEvent.total
        const progress = Math.ceil(loaded)
        progressCb(progress)
      }
    })
  }
  all(nw) {
    return hy.$http.all(nw)
  }
  spread(nw) {
    return hy.$http.spread(nw)
  }
}

export default HyNetworking
