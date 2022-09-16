import { request } from "../request"

// 请求详情页达人基础信息
export function reqXhsBasic (data) {
  return request.post("/api/kol/resource/xhs/basic", data)
}
