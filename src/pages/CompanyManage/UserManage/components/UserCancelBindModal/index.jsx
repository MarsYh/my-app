import { Avatar, Modal } from 'antd'
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import styles from './index.module.less'

function UserCancelBindModal(props, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [record, setRecord] = useState([])
  function handleOk() {
    setIsModalOpen(false)
  }
  function handleCancel() {
    setIsModalOpen(false)
  }
  // 让外层点击的时候可以获取里层的方法
  useImperativeHandle(ref, () => {
    return {
      open(record) {
        // console.log(roleList)
        // 设置打开
        setIsModalOpen(true)
        setRecord(record)
      },
    }
  })
  return (
    <Modal
      width={433}
      title="解除绑定"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}>
      <div className={styles.container}>
        <div className={styles.title}>
          <span>你即将解除</span>
          <Avatar
            src={record.headUrl}
            style={{
              width: '24px',
              height: '24px',
              lineHeight: '24px',
              fontSize: '18px',
            }}
          />
          <span>{record.nickName}</span>
          <span>的子账号权益，请确认。解绑后，该用户的</span>
          <span className={styles.versionName}>版本名称</span>
          <span>权益将取消，如需重新绑定，请重新添加子账号</span>
        </div>
        <div>
          <div>
            <label>角色类型：</label>
            <span>{record.roleName}</span>
          </div>
          <div>
            <label>所属部门：</label>
            <span>{record.deptName}</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default forwardRef(UserCancelBindModal)
