// 头像资料
import React from 'react'
import styles from './index.module.less'
import { Avatar } from 'antd'

const HeaderRight = () => {
  return (
    <div className={styles.profile}>
      <Avatar src="https://joeschmoe.io/api/v1/random" size={32} />
      <span>Users</span>
    </div>
  )
}
export default HeaderRight
