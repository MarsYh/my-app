import request from "../request"

// 请求小红书列表
export function reqXhsList (data) {
  return request.post(
    "http://test-gw.newrank.cn:18080/api/kol/resource/xhs/list",
    data,
    {
      headers: { "n-token": "342bdbf6864146f59730fbd6eace18f9" },
    }
  )
}
