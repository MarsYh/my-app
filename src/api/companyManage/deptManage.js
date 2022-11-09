import { request } from "../request"

// 创建部门
export function reqAddDept (data) {
  return request.post("/api/throwdata/throw/data/dept/addDept", data)
}
// 编辑部门
export function reqModifyDep (data) {
  return request.post("/api/throwdata/throw/data/dept/modifyDept", data)
}
// 删除部门
export function reqRemoveDept (data) {
  return request.post("/api/throwdata/throw/data/dept/removeDept", data)
}
// 管理用户
export function reqDeptManage (params) {
  return request.get("/api/throwdata/throw/data/user/user6", { params })
}
