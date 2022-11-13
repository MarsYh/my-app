import { Input, message, Modal, Button, Checkbox, Avatar } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import styles from './index.module.less'
import { reqDeptManage } from '@/api/companyManage'
import IconSearch from '../../../UserManage/img/icon-search.svg'
import { DeleteOutlined } from '@ant-design/icons'

function UserManageModal(props, ref) {
  const [checkedList, setCheckedList] = useState()
  const [checkAll, setCheckAll] = useState(false)
  const options = ['mike', 'tony', 'thomas', 'jack', 'smith', 'mars']

  const options1 = options.slice(0, 5)
  const options2 = options.slice(-1)
  const onChange = (list) => {
    console.log(list)
    setCheckedList(list)
    setCheckAll(list.length === options.length)
  }
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? options : [])
    setCheckAll(e.target.checked)
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState({})
  // const [params, setParams] = useState({
  //   uuid: '',
  // })
  // const [data, setData] = useState({})

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
        // getDeptManage(params)
        setId(id)
      },
    }
  })
  return (
    <Modal
      width={600}
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
          <div className={styles.checkBox}>
            <div className={styles.checkAll}>
              <Checkbox onChange={onCheckAllChange} checked={checkAll}>
                全选
              </Checkbox>
            </div>
            <div className={styles.checkBoxGroup}>
              {/* <div className={styles.head}>asssdff</div>
              <Checkbox.Group
                className={styles.group}
                options={options1}
                value={checkedList}
                onChange={onChange}
              />
              <div className={styles.head}>部门2</div>
              <Checkbox.Group
                className={styles.group}
                options={options2}
                value={checkedList}
                onChange={onChange}
              /> */}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.head}>
            <div>
              已选
              <span>0</span>人
            </div>
            <div className={styles.clearBtn}>
              <DeleteOutlined />
              <span>清空</span>
            </div>
          </div>
          <div className={styles.userList}></div>
        </div>
      </div>
    </Modal>
  )
}

export default forwardRef(UserManageModal)
