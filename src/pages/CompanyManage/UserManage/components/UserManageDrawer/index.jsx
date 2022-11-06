import { Drawer, Button, message, Radio, Checkbox, Avatar } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import styles from './index.module.less'
import { reqUserList, reqEditUser } from '@/api/companyManage'

function UserManageDrawer(props, ref) {
  const { onSuccess } = props

  const [open, setOpen] = useState(false)
  const [record, setRecord] = useState({})
  const [type, setType] = useState({})
  // 列表数据
  const [viewData, setViewData] = useState({})
  const [listLoading, setListLoading] = useState(false)
  // 请求编辑接口的参数
  const [checkParams, setCheckParams] = useState({})
  // 让外层点击的时候可以获取里层的方法
  useImperativeHandle(ref, () => {
    return {
      open(record, type) {
        // 设置打开
        setOpen(true)
        setType(type)
        const o = { userUuid: [] }
        if (Array.isArray(record)) {
          o.userUuid = record.map((item) => item.uuid)
        } else {
          o.userUuid = [record.uuid]
        }
        setRecord(record)
        getUserInfo({ userUuid: o.userUuid })
      },
    }
  })

  // 获取当前用户的信息展示
  function getUserInfo(params) {
    setListLoading(true)
    reqUserList(params)
      .then((res) => {
        const { success, message: msg, data } = res
        if (success && data) {
          filterCheck(data, params.userUuid)
        } else {
          message.error(msg || '获取列表失败')
        }
      })
      .finally(() => setListLoading(false))
  }

  // 过滤查找出默认被选中的信息
  function filterCheck(info, userUuid) {
    const { deptList = [], roleList = [], teamList = [] } = info
    const _findSingle = ({ check }) => check
    const deptUuid = deptList.find(_findSingle)?.uuid
    const roleUuid = roleList.find(_findSingle)?.roleUuid
    const teamUuidList = teamList
      .map((team) => team.check && team.uuid)
      .filter(Boolean)

    // 设置当前被选中的值
    setCheckParams({
      userUuid,
      deptUuid,
      roleUuid,
      teamUuidList,
    })

    // 设置渲染的值
    setViewData(info)
  }

  async function handleEditUserInfo() {
    const res = await reqEditUser(checkParams)
    const { success, data, message: msg } = res
    if (success && data) {
      setOpen(false)
      message.success('编辑成功')
      onSuccess()
    } else {
      message.error(msg || '编辑失败')
    }
  }

  function onTeamListChange(checkedList) {
    const _checkParams = { ...checkParams }
    _checkParams.teamUuidList = checkedList
    setCheckParams(_checkParams)
  }

  function onCheckAllChange(e) {
    const _checkParams = { ...checkParams }
    const { checked } = e.target
    if (checked) {
      _checkParams.teamUuidList = teamList.map(({ uuid }) => uuid)
    } else {
      _checkParams.teamUuidList = []
    }
    setCheckParams(_checkParams)
  }

  // 部门回调
  function onDeptChange(deptUuid) {
    const _checkParams = { ...checkParams }
    _checkParams.deptUuid = deptUuid
    setCheckParams(_checkParams)
  }

  // 角色回调
  function onRoleChange(e) {
    const { value } = e.target
    const _checkParams = { ...checkParams }
    _checkParams.roleUuid = value
    setCheckParams(_checkParams)
  }

  const { deptList = [], roleList = [], teamList = [] } = viewData
  const { deptUuid, roleUuid, teamUuidList = [] } = checkParams

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
        {/* 批量选择的用户头像 */}
        {type === 'batch' ? (
          <div className={classNames(styles.selectedUsers, styles.radioGroup)}>
            <div>选中了</div>
            <div>
              <Avatar src={record.headUrl} />
            </div>
            {record.length === 1 ? (
              <div>{record.length}个</div>
            ) : (
              <div>等{record.length}个</div>
            )}
          </div>
        ) : null}
        {type === 'batch' || type === 'edit' || type === 'deptName' ? (
          <div className={styles.box}>
            <div className={styles.title}>
              <span>所属部门</span>
            </div>
            <div className={styles.radioGroup}>
              {deptList.map((item) => (
                <Radio
                  key={item.uuid}
                  checked={item.uuid === deptUuid}
                  onChange={() => onDeptChange(item.uuid)}>
                  {item.deptName}
                </Radio>
              ))}
            </div>
          </div>
        ) : null}
        {type === 'batch' || type === 'edit' || type === 'roleName' ? (
          <div className={styles.box}>
            <div className={styles.title}>角色类型</div>
            <div>
              <Radio.Group
                className={styles.radioGroup}
                value={roleUuid}
                onChange={onRoleChange}>
                {roleList.map((item) => (
                  <Radio key={item.roleUuid} value={item.roleUuid}>
                    {item.roleName}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
        ) : null}
        {type === 'batch' || type === 'edit' || type === 'team' ? (
          <div className={styles.box}>
            <div className={styles.title}>
              <span>所属团队</span>
              <Checkbox
                onChange={onCheckAllChange}
                checked={
                  teamUuidList.length && teamUuidList.length === teamList.length
                }>
                全选
              </Checkbox>
            </div>
            <div>
              <Checkbox.Group
                className={styles.radioGroup}
                value={teamUuidList}
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
