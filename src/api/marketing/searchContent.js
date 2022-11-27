import { request } from "../request"

// 内容搜索列表
export function reqSearchContent (data) {
  return request.post("/api/kol/resource/xhs/note/search", data)
}