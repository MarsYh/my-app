// 跳转登录
export function toLogin () {
  window.location.href = `http://test.main.newrank.cn/user/login?displayType=login&backUrl=${encodeURIComponent(
    window.location.href
  )}&source=130&type=121&scene=adinsight_login`
}