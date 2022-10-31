import { Drawer, Button } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import styles from './index.module.less'

function UserManageDrawer(props, ref) {
  const [open, setOpen] = useState(false)
  const [record, setRecord] = useState({})

  // 让外层点击的时候可以获取里层的方法
  useImperativeHandle(ref, () => {
    return {
      open(record) {
        // 设置打开
        setOpen(true)
        setRecord(record)
      },
    }
  })
  function handleSet() {}
  return (
    <Drawer
      closable={false}
      open={open}
      placement="right"
      width="360px"
      onClose={() => setOpen(false)}
      footer={
        <div className={styles.drawerFooter}>
          <Button
            onClick={() => handleSet('1')}
            className={classNames(styles.cancelBtn, styles.btn)}>
            取消
          </Button>
          <Button
            onClick={() => handleSet('2')}
            className={classNames(styles.setBtn, styles.btn)}>
            确认设置
          </Button>
        </div>
      }></Drawer>
  )
}

export default forwardRef(UserManageDrawer)
