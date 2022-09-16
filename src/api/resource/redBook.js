import { request } from "../request"

// 请求小红书列表
export function reqXhsList (data) {
  return request.post("/api/kol/resource/xhs/list", data)
}
