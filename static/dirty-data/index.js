const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./json-data/', true, /\.json$/)
const jsonData = requireAll(req);
const jsonDataDic = {}

req.keys().map((e, i) => {
  jsonDataDic[[req.keys()[i].slice(2, -5)]] = jsonData[i]
})

export default jsonDataDic
