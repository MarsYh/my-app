import React from 'react'
import { Badge } from 'antd'
import styles from './index.module.less'

function TaskStatus(props) {
  const { status } = props
  if (status === '执行成功') {
    return (
      <span>
        <Badge status="success" />
        <span>{status}</span>
      </span>
    )
  }
  if (status === '执行失败') {
    return (
      <div>
        <Badge status="error" />
        <span>{status}</span>
      </div>
    )
  }
  if (status === '无法执行') {
    return (
      <div>
        <Badge status="default" />
        <span>{status}</span>
      </div>
    )
  }
}

export default TaskStatus
