import React, { useImperativeHandle, forwardRef } from 'react'

const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      childFn,
    }
  })
  const childFn = () => {
    console.log('子组件方法')
  }
  return (
    <div>
      <div ref={ref} />
    </div>
  )
})
export default Child
