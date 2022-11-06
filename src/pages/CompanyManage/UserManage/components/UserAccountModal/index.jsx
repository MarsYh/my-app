import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react'
import { Modal, Form, Select, Divider, Button, message } from 'antd'
import styles from './index.module.less'
import { reqDeptList, reqGetBindCode } from '@/api/companyManage'
import UserBindAccountModal from '../UserBindAccountModal'

function UserAccountModal(props, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roleList, setRoleList] = useState([])
  const [deptList, setDeptList] = useState([])
  const [bindCode, setBindCode] = useState({
    roleUuid: '',
    deptUuid: '',
  })
  const { Option } = Select
  const userBindAccountRef = useRef()

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
        getDeptList()
      },
    }
  })
  function getDeptList() {
    reqDeptList({}).then((res) => {
      const { success, message: msg, data } = res
      if (success && data) {
        setDeptList(data.records)
      } else {
        message.error(msg || '获取部门列表失败')
      }
    })
  }
  async function handleGetBindCode() {
    const res = await reqGetBindCode(bindCode)
    const { data, success, message: msg } = res
    if (success && data) {
      setBindCode(data)
    } else {
      message.error(msg || '生成绑定码失败')
    }
  }
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
              {deptList?.map((item) => (
                <Option key={item.uuid} value={item.uuid}>
                  {item.deptName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        <Divider />
        <div className={styles.btnBox}>
          <Button
            onClick={() => [
              userBindAccountRef?.current.open(roleList, deptList),
              setIsModalOpen(false),
            ]}>
            直接绑定
          </Button>
          <Button onClick={handleGetBindCode}>生成绑定码</Button>
        </div>
      </div>
      <UserBindAccountModal ref={userBindAccountRef} />
    </Modal>
  )
}

export default forwardRef(UserAccountModal)