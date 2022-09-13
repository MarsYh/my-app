import axios from "axios";

const request = axios.create({
    timeout:5000,
    withCredentials:true,
    headers:{
        "n-token":"xxxx"
    }
})

// 请求拦截器
// request.interceptors.request(()=>{

// })

// // 响应拦截器
// request.interceptors.response(()=>{

// })

export default request
