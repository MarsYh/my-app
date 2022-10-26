import React from 'react'
import { Drawer, message, Spin } from "antd"
import { useState,forwardRef,useImperativeHandle } from 'react'
import { reqTaskDetail } from "@/api/task"
import {TASK_CODE_CONFIG } from "../../sourceData" 
import { useEffect } from 'react'

const TaskDrawer = (props,ref)=>{

    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const [title,setTitle] = useState('任务抽屉')
    const [data,setData] = useState({})

    useEffect(()=>{
        console.log("useEffect")
        console.log("拒绝")
    },[])

    useImperativeHandle(ref,()=>{
        return {
            open(record){
                setOpen(true)
                // 设置标题
                setTitle(TASK_CODE_CONFIG[record.taskTypeCode])
                // 请求数据
                getTaskDetail(record.taskId)
            }
        }
    })

    function getTaskDetail(taskId){
        setLoading(true)
        reqTaskDetail({taskId}).then(res=>{
            const { success,message:msg,data } = res
            if(success && data){
                setData(data)
            }else{
                message.error(msg || "获取数据失败")
            }
        }).finally(()=>setLoading(false))
    }

    return (
        <Drawer title={title} open={open} onClose={() => setOpen(false)}>
            <Spin spinning={loading}>
                content
            </Spin>
        </Drawer>
    )

}



export default forwardRef(TaskDrawer)