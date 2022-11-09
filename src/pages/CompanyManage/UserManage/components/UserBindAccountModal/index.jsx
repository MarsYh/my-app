import { Modal, Form, Select, Input, Button, message } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import styles from './index.module.less'
import { ReloadOutlined } from '@ant-design/icons'
import { reqEmailBind } from '@/api/companyManage'

function UserBindAccountModal(props, ref) {
  const [bindForm] = Form.useForm()

  const { reset } = props

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState({})

  const { Option } = Select
  function handleOk() {
    setIsModalOpen(false)
  }
  function handleCancel() {
    setIsModalOpen(false)
  }

  // 让外层点击的时候可以获取里层的方法
  useImperativeHandle(ref, () => {
    return {
      open(options) {
        const { roleList, deptList, checkValues } = options
        // 设置打开
        setIsModalOpen(true)
        setData({ roleList, deptList })
        bindForm.setFieldsValue(checkValues)
      },
      close() {
        setIsModalOpen(false)
      },
    }
  })

  function handleBind() {
    bindForm.submit()
  }

  async function onFinish(values) {
    const res = await reqEmailBind(values)
    const { success, message: msg, data } = res
    if (success && data) {
      message.success('绑定成功')
      setIsModalOpen(false)
    } else {
      message.error(msg || '绑定失败')
    }
  }

  const { roleList = [], deptList = [] } = data

  return (
    <Modal
      width={433}
      title="添加子账号"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div className={styles.emailFooter}>
          <Button type="link" onClick={() => [setIsModalOpen(false), reset()]}>
            <ReloadOutlined />
            <span>重置</span>
          </Button>
          <div>
            <Button onClick={() => setIsModalOpen(false)}>取消</Button>
            <Button type="primary" onClick={handleBind}>
              绑定
            </Button>
          </div>
        </div>
      }>
      <div className={styles.emailBox}>
        <div>
          直接输入需要绑定账号的邮箱，待持有者完成注册绑定邮箱后即可使用
        </div>
        <Form form={bindForm} onFinish={onFinish}>
          <Form.Item
            name="email"
            label="输入邮箱"
            rules={[
              {
                required: true,
                message: '请输入正确的邮箱地址',
              },
            ]}>
            <Input placeholder="请输入绑定邮箱" />
          </Form.Item>
          <Form.Item
            name="roleUuid"
            label="角色类型"
            rules={[
              {
                required: true,
              },
            ]}>
            <Select placeholder="" disabled>
              {roleList?.map((item) => (
                <Option key={item.roleUuid} value={item.roleUuid}>
                  {item.roleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="deptUuid"
            label="所属部门"
            rules={[
              {
                required: true,
              },
            ]}>
            <Select placeholder="请选择部门" disabled>
              {deptList?.map((item) => (
                <Option key={item.uuid} value={item.uuid}>
                  {item.deptName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default forwardRef(UserBindAccountModal)
