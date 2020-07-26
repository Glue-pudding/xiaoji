import { API } from '../api';
// 登陆
export const login = (params) => {
    return hyNetWork.post(`${API.login}`, params).then(res => res.data)
}