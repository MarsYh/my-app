import { Modal, Button, message } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import styles from './index.module.less'
import { reqRemoveDept } from '@/api/companyManage'

function RemoveDeptModal(props, ref) {
  const { onSuccess } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [record, setRecord] = useState([])

  function handleOk() {
    setIsModalOpen(false)
  }
  function handleCancel() {
    setIsModalOpen(false)
  }
  useImperativeHandle(ref, () => {
    return {
      open(record) {
        setIsModalOpen(true)
        setRecord(record)
      },
    }
  })
  async function handleRemoveDept() {
    const res = await reqRemoveDept({ id: record.id })
    const { success, message: msg, data } = res
    if (success && data) {
      message.success('删除部门成功')
      setRecord(data)
      setIsModalOpen(false)
      onSuccess()
    } else {
      message.error(msg || '删除部门失败')
    }
  }
  return (
    <Modal
      className={styles.deleteModal}
      title="删除部门"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div className={styles.footer}>
          <Button onClick={() => setIsModalOpen(false)}>取消</Button>
          <Button type="primary" onClick={() => handleRemoveDept()}>
            确定
          </Button>
        </div>
      }>
      <div style={{ marginTop: '8px' }}>
        确定删除部门<span style={{ color: '#727fff' }}>{record.deptName}</span>
        吗？
      </div>
    </Modal>
  )
}

export default forwardRef(RemoveDeptModal)
