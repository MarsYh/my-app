import { Drawer, Button, message, Radio } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import styles from './index.module.less'
import { reqUserList } from '@/api/companyManage'

function UserManageDrawer(props, ref) {
  const [open, setOpen] = useState(false)
  const [record, setRecord] = useState({})
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
      open(record) {
        // 设置打开
        setOpen(true)
        setRecord(record)
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
        console.log('data', data)
        if (success && data) {
          setData(data)
        } else {
          message.error(msg || '获取列表失败')
        }
      })
      .finally(() => setListLoading(false))
  }
  function handleSet() {}

  const { deptList = [], roleList = [], teamList = [] } = data
  return (
    <Drawer
      title="编辑用户信息"
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
            onClick={() => handleSet('2')}
            className={classNames(styles.setBtn, styles.btn)}>
            确认设置
          </Button>
        </div>
      }>
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
          </div>
          <div>
            <Radio.Group className={styles.radioGroup}>
              {teamList.map((item) => (
                <Radio key={item.uuid} value={item.uuid}>
                  {item.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default forwardRef(UserManageDrawer)
