import { Modal, Input, Button, message } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import styles from './index.module.less'
import { reqAddDept, reqModifyDep } from '@/api/companyManage'

function AddDeptModal(props, ref) {
  const { onSuccess } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [type, setType] = useState({})
  const [list, setList] = useState([])
  // 创建部门接口数据
  const [params, setParams] = useState({
    deptName: '',
  })
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
      open(list, type) {
        setIsModalOpen(true)
        setType(type)
        setList(list)
      },
    }
  })
  async function handleAddDept() {
    const res = await reqAddDept(params)
    const { data, message: msg, success } = res
    if (success && data) {
      message.success('创建部门成功')
      setList(data)
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
      setList(data)
      setIsModalOpen(false)
      onSuccess()
    } else {
      message.error(msg || '编辑部门失败')
    }
  }

  function onDeptChange(e) {
    const _name = e.target.value
    const newParams = { ...params }
    if (_name) {
      newParams.deptName = _name
    } else {
      delete newParams.deptName
    }
    setParams(newParams)
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
          value={params.deptName}
          defaultValue={editParams.deptName}
          onChange={onDeptChange}
        />
      </div>
    </Modal>
  )
}

export default forwardRef(AddDeptModal)
