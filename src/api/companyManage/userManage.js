import { request } from "../request"

// 请求用户列表
export function reqUserManage (params) {
  // console.log("===>", params)
  return request.get("/api/throwdata/throw/data/user/user3", { params })
}
// 获取每个部门人数
export function reqUserNum (data) {
  return request.post("/api/throwdata/throw/data/user/user2", data)
}