import { request } from "../request"

// 请求详情页达人基础信息
export function reqXhsBasic (data) {
  // console.log("data:", data)
  return request.post("/api/kol/resource/xhs/basic", data)
}
// 请求详情页价格信息
export function reqXhsPrice (data) {
  // console.log("data:", data)
  return request.post("/api/kol/resource/xhs/price", data)
}
// 请求详情页传播表现信息
export function reqXhsDp (data) {
  // console.log("data:", data)
  return request.post("/api/kol/resource/xhs/dp", data)
}
// 请求详情页笔记案例
export function reqXhsNote (data) {
  return request.post("/api/kol/resource/xhs/nc", data)
}