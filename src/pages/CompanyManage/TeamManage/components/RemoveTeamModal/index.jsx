import { Modal, Button, message } from 'antd'
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import styles from './index.module.less'
import { reqDeleteTeam } from '@/api/companyManage'
import { ExclamationCircleOutlined } from '@ant-design/icons'

function RemoveTeamModal({ onSuccess }, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [type, setType] = useState({})
  const [record, setRecord] = useState([])
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
        const o = { uuids: [] }
        let _record = null
        if (Array.isArray(record)) {
          _record = record
          o.uuids = record.map((item) => item.uuid)
        } else {
          _record = [record]
          o.uuids = [record.uuid]
        }
        setRecord(_record)
        setType(type)
      },
    }
  })
  async function handleDeleteTeam() {
    const res = await reqDeleteTeam({
      uuids: type === 'batch' ? record.map((item) => item.uuid) : [record.uuid],
    })
    const { success, message: msg, data } = res
    if (success && data) {
      message.success('删除部门成功')
      setIsModalOpen(false)
      onSuccess()
    } else {
      message.error(msg || '删除部门失败')
    }
  }
  return (
    <Modal
      closable={false}
      width={416}
      className={styles.deleteModal}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div className={styles.footer}>
          <Button onClick={() => setIsModalOpen(false)}>取消</Button>
          <Button type="primary" onClick={() => handleDeleteTeam()}>
            确定
          </Button>
        </div>
      }>
      <div className={styles.modalContent}>
        <ExclamationCircleOutlined
          style={{
            float: 'left',
            marginRight: '16px',
            fontSize: '22px',
            color: '#ffb700',
          }}
        />
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>提示</span>
        <div className={styles.confirm}>
          {type === 'batch' ? (
            <>
              <div>是否要删除以下团队:</div>
              {record.map((item) => (
                <span key={item.uuid} style={{ color: '#727fff' }}>
                  {item.name}
                </span>
              ))}
            </>
          ) : (
            <>
              <span>是否要删除团队</span>
              <span style={{ color: '#727fff' }}>{record.name}</span>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default forwardRef(RemoveTeamModal)
