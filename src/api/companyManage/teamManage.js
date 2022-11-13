import { request } from "../request"

// 获取团队列表
export function reqListTeam (data) {
  return request.post('/api/throwdata/throw/data/user/listTeam', data)
}
// 请求团队和部门之间的关系
export function reqTeamUserInfo (params) {
  return request.get('/api/throwdata/throw/data/user/user6', { params })
}
// 获取团队列表
export function reqSubmitTeamUserInfo (data) {
  return request.post('/api/throwdata/throw/data/user/user5', data)
}
