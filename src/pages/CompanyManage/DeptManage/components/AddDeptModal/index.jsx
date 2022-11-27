import { Modal, Input, Button, message } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import styles from './index.module.less'
import { reqAddDept, reqModifyDep } from '@/api/companyManage'

function AddDeptModal(props, ref) {
  const { onSuccess } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [type, setType] = useState({})
  const [record, setRecord] = useState([])
  // 创建部门接口数据
  const [deptName, setDeptName] = useState()
  const [editParams, setEditParams] = useState({
    deptName: '',
    uuid: '',
  })
  function handleOk() {
    setIsModalOpen(false)
  }
  function handleCancel() {
    setIsModalOpen(false)
  }

  useImperativeHandle(ref, () => {
    return {
      open(record, type) {
        setIsModalOpen(true)
        setType(type)
        setRecord(record)
      },
    }
  })
  async function handleAddDept() {
    const res = await reqAddDept(deptName)
    const { data, message: msg, success } = res
    if (success && data) {
      message.success('创建部门成功')
      setRecord(data)
      setIsModalOpen(false)
      onSuccess()
    } else {
      message.error(msg || '创建部门失败')
    }
  }
  async function handleEditModal() {
    const res = await reqModifyDep(editParams)
    const { data, message: msg, success } = res
    if (success && data) {
      message.success('编辑部门成功')
      setRecord(data)
      setIsModalOpen(false)
      onSuccess()
    } else {
      message.error(msg || '编辑部门失败')
    }
  }

  function onDeptChange(e) {
    const _deptName = e.target.value
    setDeptName(_deptName)
  }
  return (
    <Modal
      className={styles.addDeptModal}
      width={433}
      title={type === 'edit' ? '编辑部门' : '新建部门'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div className={styles.footer}>
          <Button onClick={() => setIsModalOpen(false)}>取消</Button>
          <Button
            type="primary"
            onClick={() =>
              type === 'edit' ? handleEditModal() : handleAddDept()
            }>
            确定
          </Button>
        </div>
      }>
      <div className={styles.content}>
        <span>部门名称</span>
        <Input
          placeholder="请输入部门名称"
          autocomplete="off"
          value={deptName}
          defaultValue={editParams.deptName}
          onChange={onDeptChange}
        />
      </div>
    </Modal>
  )
}

export default forwardRef(AddDeptModal)
