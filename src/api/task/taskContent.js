import { request } from "../request"


// 请求任务列表
export function reqTaskList (data) {
  // console.log("data:", data)
  return request.post("/api/kol/xdnphb/kol/resource/taskCentre/queryTask", data)
}
// 获取各平台任务数
export function reqTaskNum (params) {
  return request.get("/api/kol/xdnphb/kol/resource/taskCentre/queryPlatformTaskNum", { params })
}
// 获取任务详情
export function reqTaskDetail (params) {
  // console.log("params", params)
  return request.get("/api/kol/xdnphb/kol/resource/taskCentre/queryTaskDetail", { params })
}
// 请求是否通过数据
export function reqTaskAudit (data) {
  return request.post("/api/kol/xdnphb/kol/resource/taskCentre/audit", data)
}
// 请求是否重试
export function reqTaskRetry (data) {
  return request.post("/api/kol/xdnphb/kol/resource/taskCentre/taskRetry", data)
}
// 请求子任务列表
export function reqSubTask (data) {
  return request.post("/api/kol/xdnphb/kol/resource/taskCentre/querySubTask", data)
}
