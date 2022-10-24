// 任务中心
import React from 'react'
import { Outlet } from 'react-router-dom'

function Task() {
  return (
    <div>
      task
      <Outlet />
    </div>
  )
}

export default Task
