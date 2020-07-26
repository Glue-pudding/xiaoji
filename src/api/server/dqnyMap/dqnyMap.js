  // 查询蜂窝热力图
  const omsPath = 'oms^omses-oms/'
  export const energyView = (host, prefix = omsPath, suffix = '') =>
    host + prefix + 'energyView/queryEnergyOview' + suffix

  export const energyLoadRank = (host, prefix = omsPath, suffix = '') =>
  host + prefix + 'energyView/queryEnergyLoadRank' + suffix

  export const energyTypeDistributed = (host, prefix = omsPath, suffix = '') =>
  host + prefix + 'companyArchivesUseEnergy/queryEnergyTypeDistributed' + suffix

  export const companyDetail = (host, prefix = omsPath, suffix = '') =>
  host + prefix + 'energyView/queryEnergyDetailByCompnayNumber' + suffix

  export const querySelector = (host, prefix = omsPath, suffix = '') =>
  host + prefix + 'energyView/querySelector' + suffix

  export const queryCompanyDetail = (host, prefix = omsPath, suffix = '') =>
  host + prefix + 'energyView/queryCompanyDetail' + suffix

  