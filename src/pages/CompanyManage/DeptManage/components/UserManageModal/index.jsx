import { Input, message, Modal, Button, Checkbox } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import styles from './index.module.less'
import { reqDeptManage } from '@/api/companyManage'
import IconSearch from '../../../UserManage/img/icon-search.svg'
import { DeleteOutlined } from '@ant-design/icons'

function UserManageModal(props, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState({})
  const [params, setParams] = useState({
    uuid: '',
  })
  const [data, setData] = useState({})

  function handleOk() {
    setIsModalOpen(false)
  }
  function handleCancel() {
    setIsModalOpen(false)
  }
  useImperativeHandle(ref, () => {
    return {
      open(id) {
        setIsModalOpen(true)
        getDeptManage(params)
        setId(id)
      },
    }
  })

  function getDeptManage(params) {
    reqDeptManage(params).then((res) => {
      const { success, data, message: msg } = res
      if (success && data) {
        setData(data, id)
      } else {
        message.error(msg || '请求管理用户失败')
      }
    })
  }
  return (
    <Modal
      className={styles.manageModal}
      title="管理用户"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <>
          <Button onClick={() => setIsModalOpen(false)}>取消</Button>
          <Button disabled type="primary">
            确认
          </Button>
        </>
      }>
      <div className={styles.box}>
        <div className={styles.left}>
          <div>
            <Input
              allowClear
              placeholder="输入名称搜索"
              prefix={<img src={IconSearch} alt="" />}
              addonAfter={<Button type="primary">搜索</Button>}
            />
          </div>
          <div></div>
        </div>
        <div className={styles.right}>
          <div className={styles.head}>
            <div>
              已选
              <span></span>人
            </div>
            <div className={styles.clearBtn}>
              <DeleteOutlined />
              <span>清空</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default forwardRef(UserManageModal)
