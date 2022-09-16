// 达人头部基础信息
import React,{ useEffect,useState }  from 'react'
import { reqXhsBasic } from "@/api/resourceDetail"
import { useParams } from "react-router-dom"
import { message,Spin } from 'antd'

const BasicHead = ()=>{

    const { id } = useParams()

    const [data,setData] = useState({})
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        const params = { userId:id,ageId:12323 }
        setLoading(true)
        reqXhsBasic(params).then(res=>{
            const { success,msg,data } = res
            if(success && data){
                setData(data)
                message.success("请求成功")
            }else{
                message.error(msg || "请求失败")
            }
        }).catch(error=>{
            console.log("error:")
        }).finally(()=>{
            setTimeout(()=>setLoading(false),3000)
        })
    },[])

    return (
        <Spin spinning={loading}>
            用户姓名：{data.name || '-'}
        </Spin>
    )

}

export default BasicHead