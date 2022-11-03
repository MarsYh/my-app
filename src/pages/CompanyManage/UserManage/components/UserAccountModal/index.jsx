import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Modal, Form, Select, Divider, Button } from 'antd'
import styles from './index.module.less'

function UserAccountModal(props, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roleList, setRoleList] = useState([])
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
      open(roleList) {
        // 设置打开
        setIsModalOpen(true)
        setRoleList(roleList)
        console.log(roleList)
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
      footer="">
      <div>
        <Form>
          <Form.Item
            name="选择角色"
            label="选择角色"
            rules={[
              {
                required: true,
              },
            ]}>
            <Select placeholder="请选择角色">
              {roleList?.map((item) => (
                <Option key={item.roleUuid} value={item.roleUuid}>
                  {item.roleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="选择部门"
            label="选择部门"
            rules={[
              {
                required: true,
              },
            ]}>
            <Select placeholder="请选择部门">
              {/* {roleList?.map((item) => (
                <Option key={item.roleUuid} value={item.roleUuid}>
                  {item.roleName}
                </Option>
              ))} */}
            </Select>
          </Form.Item>
        </Form>
        <Divider />
        <div className={styles.btnBox}>
          <Button>直接绑定</Button>
          <Button>生成绑定码</Button>
        </div>
      </div>
    </Modal>
  )
}

export default forwardRef(UserAccountModal)
