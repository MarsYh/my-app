import { request } from "../request"

// 获取团队列表
export function reqListTeam (data) {
  return request.post('/api/throwdata/throw/data/user/listTeam', data)
}
// 请求团队和部门之间的关系
export function reqTeamUserInfo (params) {
  return request.get('/api/throwdata/throw/data/user/user6', { params })
}
// 管理用户提交
export function reqSubmitTeamUserInfo (data) {
  return request.post('/api/throwdata/throw/data/user/user5', data)
}
// 编辑修改团队
export function reqUpdTeam (data) {
  return request.post('/api/throwdata/throw/data/user/updTeam', data)
}
// 新建团队
export function reqAddTeam (data) {
  return request.post('/api/throwdata/throw/data/user/addTeam', data)
}
// 删除团队
export function reqDeleteTeam (data) {
  return request.post('/api/throwdata/throw/data/user/deleteTeam', data)
}
