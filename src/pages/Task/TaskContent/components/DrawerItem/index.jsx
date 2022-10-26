import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { reqTaskDetail } from '@/api/task'
import { message } from 'antd'

function DrawerItem(props, ref) {
  // 任务详情
  const [taskDetailParams, setTaskDetailParams] = useState({
    taskId: ref.taskId,
  })
  useImperativeHandle(ref, () => ({
    open: () => {
      console.log(123)
    },
  }))

  useEffect(() => {
    reqTaskDetail(taskDetailParams).then((res) => {
      // console.log('taskDetailParams', taskDetailParams)
      const { data, success, msg } = res
      if (success && data) {
        setTaskDetailParams(data)
      } else {
        message.error(msg || '获取任务详情失败')
      }
    })
  }, [taskDetailParams])

  return (
    <div>
      <h2>123</h2>
    </div>
  )
}

export default forwardRef(DrawerItem)

// import React, { forwardRef,useRef } from 'react'
// import { useImperativeHandle } from 'react'

// function Child(props,ref) {

//   const callBack=()=>{
//     console.log(1234);
//   }

//   useImperativeHandle(ref,()=>({
//     callBack
//   }))

//   return (

//     <div></div>
//   )
// }
// function Parent() {
//   const childRef = useRef()
//   return (
//     <div>
//       <div onClick={()=>childRef.current.callBack()}>触发</div>
//       <Child ref={childRef}/>
//     </div>
//   )
// }

// export default forwardRef(Child)
