// 头像资料
import { Avatar, Button, message, Popover, Space } from 'antd'
import React from 'react'
import styles from './index.module.less'
import { toLogin } from '@/utils'
import { reqLoginOut } from '@/api'
import { useGlobal } from '@/store/global'

const HeaderRight = () => {
  async function loginOut() {
    const res = await reqLoginOut()
    const { success, msg, data } = res
    if (success && data) {
      toLogin()
    } else {
      message.error(msg || '退出失败')
    }
  }

  const { userInfo } = useGlobal()

  // console.log("userInfo:",userInfo)

  return (
    <div className={styles.profile}>
      <Popover
        content={<Button onClick={loginOut}>退出登录</Button>}
        placement="bottom">
        <Space>
          <Avatar src={userInfo.headImgUrl} />
          <span className={styles.name}>{userInfo.nickName || '-'}</span>
        </Space>
      </Popover>
    </div>
  )
}

export default HeaderRight
