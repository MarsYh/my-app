import { Modal, Button } from 'antd'
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import styles from './index.module.less'

function RemoveTeamModal(props, ref) {
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
  function handleRemoveTeam() {}
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
          <Button type="primary" onClick={() => handleRemoveTeam()}>
            确定
          </Button>
        </div>
      }>
      <div>
        <div></div>
        <div style={{ marginTop: '8px' }}>
          确定删除部门
          <span style={{ color: '#727fff' }}>{record.name}</span>
          吗？
        </div>
      </div>
    </Modal>
  )
}

export default forwardRef(RemoveTeamModal)
