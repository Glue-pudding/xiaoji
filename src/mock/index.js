import mockData from 'res'

const mockDataKeys = Object.keys(mockData)

const mockRuleData = api => {
  const special = ['logout', 'userInfo']
  const direct = []
  if (special.includes(api)) {
    return {
      success: true,
      code: 2000,
      msg: '请求成功'
    }
  } else if (direct.includes(api)) {
    return {

    }
  } else if (mockDataKeys.includes(api)) {
    return mockData[api]
  } else {
    return {
      success: true,
      code: 2000,
      msg: '请求成功'
    }
  }
}

export default (Mock, api) => {
  if (process.env.NODE_ENV === 'development') {
    const apiKeys = Object.keys(api)
    apiKeys.map(e => {
      Mock.mock(api[e], mockRuleData(e))
    })
  }
}
