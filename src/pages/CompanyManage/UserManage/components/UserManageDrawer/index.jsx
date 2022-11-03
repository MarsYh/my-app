import { Drawer, Button, message, Radio, Checkbox } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import styles from './index.module.less'
import { reqUserList, reqEditUser } from '@/api/companyManage'

function UserManageDrawer(props, ref) {
  const [checkedList, setCheckedList] = useState([])
  const [open, setOpen] = useState(false)
  const [record, setRecord] = useState({})
  const [type, setType] = useState({})
  // 列表数据
  const [data, setData] = useState({})
  const [listLoading, setListLoading] = useState(false)

  // 让外层点击的时候可以获取里层的方法
  useImperativeHandle(ref, () => {
    return {
      open(record, type) {
        // 设置打开
        setOpen(true)
        setRecord(record)
        setType(type)
        const _params = { userUuid: [record.uuid] }
        getUserList(_params)
      },
    }
  })
  function getUserList(params) {
    setListLoading(true)
    reqUserList(params)
      .then((res) => {
        const { success, message: msg, data } = res
        // console.log('data', data)
        if (success && data) {
          setData(data)
        } else {
          message.error(msg || '获取列表失败')
        }
      })
      .finally(() => setListLoading(false))
  }
  function handleEditUserInfo() {
    const params = {
      deptUuid: record.deptUuid,
      roleUuid: record.roleUuid,
      userUuid: [record.userUuid],
    }
    reqEditUser(params).then((res) => {
      const { success, message: msg, data } = res
      if (success && data) {
        setData(data)
      } else {
        message.error(msg || '此任务状态不能重试！')
      }
    })
  }

  function onTeamListChange(checkedList) {
    // console.log(value)
    setCheckedList(checkedList)
  }
  function onCheckAllChange(e) {
    setCheckedList(e.target.checked ? teamList.map(({ uuid }) => uuid) : [])
  }

  const { deptList = [], roleList = [], teamList = [] } = data
  return (
    <Drawer
      title="编辑信息"
      loading={listLoading}
      closable={false}
      open={open}
      placement="right"
      width="360px"
      onClose={() => setOpen(false)}
      footer={
        <div className={styles.drawerFooter}>
          <Button
            onClick={() => setOpen(false)}
            className={classNames(styles.cancelBtn, styles.btn)}>
            取消
          </Button>
          <Button
            type="primary"
            onClick={handleEditUserInfo}
            className={classNames(styles.setBtn, styles.btn)}>
            确认设置
          </Button>
        </div>
      }>
      <div className={styles.container}>
        {type === 'edit' || type === 'deptName' ? (
          <div className={styles.box}>
            <div className={styles.title}>所属部门</div>
            <div>
              <Radio.Group className={styles.radioGroup}>
                {deptList.map((item) => (
                  <Radio key={item.uuid} value={item.uuid}>
                    {item.deptName}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
        ) : null}
        {type === 'edit' || type === 'roleName' ? (
          <div className={styles.box}>
            <div className={styles.title}>角色类型</div>
            <div>
              <Radio.Group className={styles.radioGroup}>
                {roleList.map((item) => (
                  <Radio key={item.roleUuid} value={item.roleUuid}>
                    {item.roleName}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
        ) : null}
        {type === 'edit' || type === 'team' ? (
          <div className={styles.box}>
            <div className={styles.title}>
              <span>所属团队</span>
              <Checkbox
                onChange={onCheckAllChange}
                checked={
                  checkedList.length && checkedList.length === teamList.length
                }>
                全选
              </Checkbox>
            </div>
            <div>
              <Checkbox.Group
                className={styles.radioGroup}
                value={checkedList}
                onChange={onTeamListChange}>
                {teamList.map((item) => (
                  <Checkbox key={item.uuid} value={item.uuid}>
                    {item.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
          </div>
        ) : null}
      </div>
    </Drawer>
  )
}

export default forwardRef(UserManageDrawer)
