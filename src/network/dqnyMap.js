import { API } from '../api'
// 查询蜂窝热力图 
export const energyView = params => {
    return hyNetWork.post(API.energyView, params).then(res => res.data)
}

export const energyLoadRank = params => {
    return hyNetWork.get(API.energyLoadRank, params).then(res => res.data)
}

export const energyTypeDistributed = params => {
    return hyNetWork.get(API.energyTypeDistributed, params).then(res => res.data)
}

export const companyDetail = params => {
    return hyNetWork.get(API.companyDetail, params).then(res => res.data)
}

export const querySelector = params => {
    return hyNetWork.post(API.querySelector, params).then(res => res.data)
}

export const queryCompanyDetail = params => {
    return hyNetWork.post(API.queryCompanyDetail, params).then(res => res.data)
}
