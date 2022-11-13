import { request } from "../request"

// 获取团队列表
export function reqListTeam (data) {
  return request.post('/api/throwdata/throw/data/user/listTeam', data)
}