import axios from "axios"
import { message } from 'antd'
import { toLogin } from "@/utils"

// 加密
function encryption (config) {
    // console.log(config)
    if (!config.data) {
        config.headers = {
            ...config.headers,
            access: `${Math.random()}_${Date.now()}_Mars`
        }
        return
    }
    // 封装函数keys
    const keys = Object.keys(config.data).reduce((prev, key) => {
        prev += `_${key}`
        return prev
    }, "")

    config.headers = {
        ...config.headers,
        access: `${keys}_Mars123`,
    }
}
const request = axios.create({
    timeout: 5000,
    withCredentials: true,
    // headers统一写到request文件里 其他在调用request的时候就不用再写一次headers了
    headers: { "n-token": "342bdbf6864146f59730fbd6eace18f9" },
    // 基础路径 其他有相同的地址前面就不用写 只用写基础路径后的内容
    baseURL: "http://test-gw.newrank.cn:18080"
})

// 定义一个函数 用来封装代理请求
const requestProxy = axios.create({
    timeout: 5000,
    withCredentials: true,
    headers: { "n-token": "342bdbf6864146f59730fbd6eace18f9" },
})
function requestCallback (config) {
    if (config.method === "get") {
        // doSomething
    }

    if (config.method === "post") {
        // doSomething
    }
    //   进行加密
    encryption(config)
    return config
}

function responseCallback (response) {
    const { data, message: reqMsg, value } = response.data

    let code = response.data?.code || response.data.value?.code


    // 初始化一个请求结构对象
    const result = {
        success: false,
        msg: reqMsg,
        data: null
    }

    // 成功
    if (code === "000000" || code === '1') {
        result.success = true
        result.data = data || value || 1
    }

    // 未登录
    if (code === "000995" || code === "000999") {
        message.error("未登录")
        toLogin()
    }

    return result
}
// 请求拦截器
request.interceptors.request.use(requestCallback)
// 响应拦截器
request.interceptors.response.use(responseCallback)
// 代理的请求拦截器
requestProxy.interceptors.request.use(requestCallback)
// 代理的响应拦截器
requestProxy.interceptors.response.use(responseCallback)
export { request, requestProxy }
