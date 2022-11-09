import { Modal, Button, message } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import styles from './index.module.less'
import { reqRemoveDept } from '@/api/companyManage'

function RemoveDeptModal(props, ref) {
  const onSuccess = props
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
  const _id = record.map((item) => item.id)
  async function handleRemoveDept(_id) {
    const res = reqRemoveDept(_id)
    const { success, message: msg, data } = res
    if (success && data) {
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
          <Button type="primary" onClick={() => handleRemoveDept(_id)}>
            确定
          </Button>
        </div>
      }>
      <div style={{ marginTop: '8px' }}>确定删除吗？</div>
    </Modal>
  )
}

export default forwardRef(RemoveDeptModal)
