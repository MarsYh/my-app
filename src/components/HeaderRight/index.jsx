// 头像资料
import { Avatar, Button, message, Popover } from 'antd'
import React from 'react'
import styles from './index.module.less'
import { toLogin } from '@/utils'
import { reqLoginOut } from '@/api'

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

  return (
    <div className={styles.profile}>
      <Popover
        content={<Button onClick={loginOut}>退出登录</Button>}
        placement="bottom">
        <Avatar
          src="http://thirdwx.qlogo.cn/mmopen/ajNVdqHZLLC2ewqicnXrICphG1SrxbhqAAuRmF6uSwgUsmAbGzymZs8AMKokveib04nt77Uyic1ibdJCZj5EHiaYIE4FtA6xGXDPKR96MVvSAQicY/132"
          size={32}
        />
        <span>Thomas</span>
      </Popover>
    </div>
  )
}

export default HeaderRight
