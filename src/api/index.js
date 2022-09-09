import request from "./request";

// 获取用户信息
export function getUserInfo(){
    return request.get('http://test-gw.newrank.cn:18080/api/throwdata/throw/data/user/getUserInfo',{
        headers: { "n-token": "342bdbf6864146f59730fbd6eace18f9" }
    })
}