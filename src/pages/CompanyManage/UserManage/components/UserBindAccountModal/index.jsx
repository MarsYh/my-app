import { Modal, Form, Select, Input, Button } from 'antd'
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import styles from './index.module.less'
import { ReloadOutlined } from '@ant-design/icons'
import UserAccountModal from '../UserAccountModal'

function UserBindAccountModal(props, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roleList, setRoleList] = useState([])
  const [deptList, setDeptList] = useState([])
  const { Option } = Select
  const useAccountModalRef = useRef()
  function handleOk() {
    setIsModalOpen(false)
  }
  function handleCancel() {
    setIsModalOpen(false)
  }

  // 让外层点击的时候可以获取里层的方法
  useImperativeHandle(ref, () => {
    return {
      open(roleList, deptList) {
        // 设置打开
        setIsModalOpen(true)
        setRoleList(roleList)
        setDeptList(deptList)
      },
    }
  })
  return (
    <Modal
      width={433}
      title="添加子账号"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div className={styles.emailFooter}>
          <Button type="link">
            <ReloadOutlined />
            <span
              onClick={() => [
                setIsModalOpen(false),
                useAccountModalRef?.current.open(roleList),
              ]}>
              重置
            </span>
          </Button>
          <div>
            <Button>取消</Button>
            <Button type="primary">绑定</Button>
          </div>
        </div>
      }>
      <div className={styles.emailBox}>
        <div>
          直接输入需要绑定账号的邮箱，待持有者完成注册绑定邮箱后即可使用
        </div>
        <Form>
          <Form.Item
            name="输入邮箱"
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
            name="roleList"
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
            name="deptName"
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
      <UserAccountModal ref={useAccountModalRef} />
    </Modal>
  )
}

export default forwardRef(UserBindAccountModal)
