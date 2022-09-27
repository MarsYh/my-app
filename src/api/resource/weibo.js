import { request } from "../request"

// 请求微博列表
export function reqWbList (data) {
  return request.post("/api/kol/xdnphb/kol/resource/wb/search", data)
}
