import { request } from "../request"

// 内容搜索列表
export function reqSearchContent (data) {
  return request.post("/api/kol/resource/xhs/note/search", data)
}
// 笔记分析详情
export function reqXhsNote (params) {
  return request.get("/api/kol/resource/xhs/note", { params })
}
// 相似作品
export function reqXhsSimilarImage (data) {
  return request.post("/api/kol/resource/xhs/note/similarImage", data)
}
// 投放行业
export function reqXhsBrandPage () {
  return request.post("/api/kol/xdnphb/kol/resource/brand/page")
}