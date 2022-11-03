import { Drawer, Button, message, Radio, Checkbox } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import styles from './index.module.less'
import { reqUserList, reqEditUser } from '@/api/companyManage'

function UserManageDrawer(props, ref) {
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const [checkedList, setCheckedList] = useState([])
  const [open, setOpen] = useState(false)
  const [record, setRecord] = useState({})
  const [key, setKey] = useState({})
  // 列表数据
  const [data, setData] = useState({})
  const [listLoading, setListLoading] = useState(false)
  // 列表请求参数
  const [params, setParams] = useState({
    userUuid: [],
  })

  // 让外层点击的时候可以获取里层的方法
  useImperativeHandle(ref, () => {
    return {
      open(record, key) {
        // 设置打开
        setOpen(true)
        setRecord(record)
        setKey(key)
        const _params = { ...params, userUuid: [record.uuid] }
        setParams(_params)
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
  function handleSet(editStatus) {
    const params = {
      deptUuid: record.deptUuid,
      roleUuid: record.roleUuid,
      userUuid: record.userUuid,
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
    setCheckAll(checkedList.length === teamList.length)
    setIndeterminate(
      !!checkedList.length && checkedList.length < teamList.length
    )
  }
  function onCheckAllChange(e) {
    setIndeterminate(false)
    setCheckedList(e.target.checked ? teamList : [])
    setCheckAll(e.target.checked)
  }

  const { deptList = [], roleList = [], teamList = [] } = data
  return key === 'edit' ? (
    <Drawer
      loading={listLoading}
      closable={false}
      open={open}
      placement="right"
      width="360px"
      onClose={() => setOpen(false)}
      footer={
        <div className={styles.drawerFooter}>
          <Button
            onClick={() => handleSet('1')}
            className={classNames(styles.cancelBtn, styles.btn)}>
            取消
          </Button>
          <Button
            type="primary"
            onClick={() => handleSet('2')}
            className={classNames(styles.setBtn, styles.btn)}>
            确认设置
          </Button>
        </div>
      }>
      <h2 className={styles.drawerHead}>编辑用户信息</h2>
      <div className={styles.container}>
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
        <div className={styles.box}>
          <div className={styles.title}>
            <span>所属团队</span>
            <Checkbox
              onChange={onCheckAllChange}
              checked={checkAll}
              indeterminate={indeterminate}>
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
      </div>
    </Drawer>
  ) : (
    <Drawer
      loading={listLoading}
      closable={false}
      open={open}
      placement="right"
      width="360px"
      onClose={() => setOpen(false)}
      footer={
        <div className={styles.drawerFooter}>
          <Button
            onClick={() => handleSet('1')}
            className={classNames(styles.cancelBtn, styles.btn)}>
            取消
          </Button>
          <Button
            type="primary"
            onClick={() => handleSet('2')}
            className={classNames(styles.setBtn, styles.btn)}>
            确认设置
          </Button>
        </div>
      }>
      {key === 'deptName' ? (
        <h2 className={styles.drawerHead}>所属部门</h2>
      ) : key === 'team' ? (
        <h2 className={styles.drawerHead}>所属团队</h2>
      ) : key === 'roleName' ? (
        <h2 className={styles.drawerHead}>角色类型</h2>
      ) : null}
      <div className={styles.container}>
        {key === 'deptName' ? (
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
        {key === 'roleName' ? (
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
        {key === 'team' ? (
          <div className={styles.box}>
            <div className={styles.title}>
              <span>所属团队</span>
              <Checkbox
                onChange={onCheckAllChange}
                checked={checkAll}
                indeterminate={indeterminate}>
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
