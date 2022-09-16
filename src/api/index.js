import { request, requestProxy } from "./request";

// 获取用户信息
export function getUserInfo() {
  return request.get("/api/throwdata/throw/data/user/getUserInfo");
}

// 退出登录
export function reqLoginOut() {
  return requestProxy.post("/nr/user/login/loginOut");
}
