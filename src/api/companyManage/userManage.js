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
// 获取部门角色团队列表
export function reqUserList (data) {
  return request.post("/api/throwdata/throw/data/user/user4", data)
}
// 请求所有角色列表
export function reqRoleList (params) {
  return request.get("/api/throwdata/throw/data/role/getRoleList", { params })
}
// 编辑用户
export function reqEditUser (data) {
  return request.post("/api/throwdata/throw/data/user/user7", data)
}
// 获取部门列表
export function reqDeptList (data) {
  return request.post("/api/throwdata/throw/data/dept/getDeptList", data)
}

// 修改用户名称
export function reqModifyName (data) {
  return request.post("/api/throwdata/throw/data/user/modifyName", data)
}
