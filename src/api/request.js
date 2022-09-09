import axios from "axios";

const request = axios.create({
    timeout:5000,
    withCredentials:true
})

// request.interceptors.request(()=>{

// })

// request.interceptors.response(()=>{

// })

export default request
