import { Button } from 'antd'
import React from 'react'
import { useRef } from 'react'
import EditModal from './EditModal'

const Parent = ()=>{

    const editModalRef = useRef()

    return (
        <div>
            <EditModal ref={editModalRef}/>
            <Button onClick={()=>editModalRef.current.open("胡月")}>点击打开</Button>
        </div>
    )

}



export default Parent