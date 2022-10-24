import { request } from "../request"


// 请求任务列表
export function reqTaskList (data) {
  // console.log("data:", data)
  return request.post("/api/kol/xdnphb/kol/resource/taskCentre/queryTask", data)
}
// 请求各平台任务数
export function reqTaskNum (data) {
  // console.log("data:", data)
  return request.post("/api/kol/xdnphb/kol/resource/taskCentre/queryPlatformTaskNum", data)
}

// 请求各平台任务类型
export function reqTaskType (data) {
  console.log("data:", data)
  return request.post("/api/kol/xdnphb/kol/resource/taskCentre/queryTaskTypeValue", data)
}