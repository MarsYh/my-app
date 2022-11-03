import { Modal, Form, Input, message } from 'antd'
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import styles from './index.module.less'
import { reqModifyName } from '@/api/companyManage'

function UserEditNameModal(props, ref) {
  const { onSuccess } = props
  const [form] = Form.useForm()
  const [record, setRecord] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  function handleOk() {
    // setIsModalOpen(false)
    form.submit()
  }
  function handleCancel() {
    setIsModalOpen(false)
  }
  async function onFinish(values) {
    // console.log('Success:', values)
    const params = { ...values, uuid: record.uuid }
    const res = await reqModifyName(params)
    const { success, message: msg, data } = res
    if (success && data) {
      message.success('修改用户名称成功')
      setIsModalOpen(false)
      onSuccess()
    } else {
      message.error(msg || '修改用户名称失败')
    }
  }

  // 让外层点击的时候可以获取里层的方法
  useImperativeHandle(ref, () => {
    return {
      open(record) {
        // 设置打开
        setIsModalOpen(true)
        setRecord(record)
        form.setFieldsValue({ name: record.inName })
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
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="输入名称"
            name="name"
            rules={[
              {
                required: true,
                message: '名称不能为空',
              },
            ]}>
            <Input placeholder="请输入名称" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default forwardRef(UserEditNameModal)
