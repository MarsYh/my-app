import { request } from "../request";

// 获取团队列表
export function reqListTeam(data) {
  return request.post("/api/throwdata/throw/data/user/listTeam", data);
}

// 获取团队与用户的关系信息
export function reqTeamUserInfo(params) {
  return request.get("/api/throwdata/throw/data/user/user6", { params });
}

// 提交团队成员信息
export function reqSubmitTeamUserInfo(data) {
  return request.post("/api/throwdata/throw/data/user/user5", data);
}

