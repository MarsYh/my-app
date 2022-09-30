import { request } from "../request"

// 请求小红书列表
export function reqXhsList (data) {
  return request.post("/api/kol/resource/xhs/list", data)
}

// 请求小红书筛选条件
export function reqXhsDict (params) {
  return request.get("/api/kol/resource/xhs/dict", {params})
}
