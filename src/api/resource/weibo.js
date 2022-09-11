import request from "../request"

// 请求微博列表
export function wbList (data) {
  return request.post(
    "http://test-gw.newrank.cn:18080/api/kol/xdnphb/kol/resource/wb/search",
    data,
    { headers: { "n-token": "342bdbf6864146f59730fbd6eace18f9" } }
  )
}