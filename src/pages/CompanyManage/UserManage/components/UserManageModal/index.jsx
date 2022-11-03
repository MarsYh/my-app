import { Modal, Form, Input } from 'antd'
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import styles from './index.module.less'

function UserManageModal(props, ref) {
  const [record, setRecord] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [params, setParams] = useState({
    userUuid: '',
  })
  function handleOk() {
    setIsModalOpen(false)
  }
  function handleCancel() {
    setIsModalOpen(false)
  }
  function onFinish(values) {
    console.log('Success:', values)
  }
  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo)
  }

  // 让外层点击的时候可以获取里层的方法
  useImperativeHandle(ref, () => {
    return {
      open(record) {
        // 设置打开
        setIsModalOpen(true)
        setRecord(record)
        const _params = { ...params, userUuid: [record.uuid] }
        console.log(_params)
        setParams(_params)
      },
    }
  })
  return (
    <Modal
      width={433}
      title="修改名称"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}>
      <div className={styles.title}>修改成员的名称，方便同协成员间的沟通</div>
      <div className={styles.infoBox}>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="输入名称"
            name="输入名称"
            rules={[
              {
                required: true,
                message: '名称不能为空',
              },
            ]}>
            <Input placeholder="请输入名称" defaultValue={record.inName} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default forwardRef(UserManageModal)
