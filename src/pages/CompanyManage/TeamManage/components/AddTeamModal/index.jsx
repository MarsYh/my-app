import { Modal, Button, message, Input } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import styles from './index.module.less'
import { reqAddTeam, reqUpdTeam } from '@/api/companyManage'

function AddTeamModal({ onSuccess }, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [type, setType] = useState({})
  const [record, setRecord] = useState({})
  // 创建团队接口数据
  const [name, setName] = useState()
  const [editParams, setEditParams] = useState({
    name: '',
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
        setName(record?.name)
      },
    }
  })
  async function handleAddTeam() {
    const res = await reqAddTeam({ name })
    const { data, message: msg, success } = res
    if (success && data) {
      message.success('创建团队成功')
      setIsModalOpen(false)
      onSuccess()
    } else {
      message.error(msg || '创建团队失败')
    }
  }
  async function handleUpdTeam() {
    const res = await reqUpdTeam({ name, uuid: record.uuid })
    const { data, message: msg, success } = res
    if (success && data) {
      message.success('编辑团队成功')
      setIsModalOpen(false)
      onSuccess()
    } else {
      message.error(msg || '编辑团队失败')
    }
  }
  function onTeamChange(e) {
    const _name = e.target.value
    setName(_name)
  }
  return (
    <Modal
      className={styles.addTeamModal}
      width={433}
      title={type === 'edit' ? '编辑团队' : '新建团队'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div className={styles.footer}>
          <Button onClick={() => setIsModalOpen(false)}>取消</Button>
          <Button
            type="primary"
            onClick={() =>
              type === 'edit' ? handleUpdTeam() : handleAddTeam()
            }>
            确定
          </Button>
        </div>
      }>
      <div className={styles.content}>
        <span>团队名称</span>
        <Input
          placeholder="请输入团队名称"
          autocomplete="off"
          value={name}
          defaultValue={editParams.name}
          onChange={onTeamChange}
        />
      </div>
    </Modal>
  )
}

export default forwardRef(AddTeamModal)
