import React, { useRef } from 'react'
import Child from './Child'

const Parent = () => {
  let parentRef = useRef(null)
  return (
    <div>
      <Child ref={parentRef}></Child>
      <button
        onClick={() => {
          console.log('parentRef', parentRef)
        }}>
        获取子组件
      </button>
    </div>
  )
}
export default Parent
