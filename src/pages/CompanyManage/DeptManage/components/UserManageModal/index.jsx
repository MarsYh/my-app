import {
  Input,
  message,
  Modal,
  Button,
  Checkbox,
  Avatar,
  Space,
  Typography,
} from 'antd'
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import styles from './index.module.less'
import { reqSubmitTeamUserInfo, reqTeamUserInfo } from '@/api/companyManage'
import IconSearch from '../../../UserManage/img/icon-search.svg'
import { DeleteOutlined, CloseCircleFilled } from '@ant-design/icons'

function UserManageModal({ onSuccess }, ref) {
  // 选中的数据
  const [checkedObj, setCheckedObj] = useState({})
  const originalTeamUserInfoRef = useRef([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  // 搜索的值
  const [searchValue, setSearchValue] = useState()
  // 团队用户信息
  const [teamUserInfo, setTeamUserInfo] = useState([])
  // 当前hover的值
  const [hoverUser, setHoverUser] = useState()
  const [record, setRecord] = useState({})

  // 选中
  const onUserChange = (deptName, checkedValues) => {
    const o = { ...checkedObj }
    o[deptName] = checkedValues
    setCheckedObj(o)
  }
  // 全选
  const onCheckAllChange = (e) => {
    const { checked } = e.target
    const o = {}
    if (checked) {
      teamUserInfo.forEach((team) => {
        const [deptName, userList] = team
        o[deptName] = userList.map((item) => item.uuid)
      })
    }
    setCheckedObj(o)
  }

  function handleCancel() {
    setTeamUserInfo([])
    setCheckedObj({})
    originalTeamUserInfoRef.current = []
    setIsModalOpen(false)
  }
  useImperativeHandle(ref, () => {
    return {
      open(record) {
        setIsModalOpen(true)
        // getDeptManage(params)
        setRecord(record)
        getTeamUserInfo({ uuid: record.uuid })
      },
    }
  })

  async function getTeamUserInfo(params) {
    const res = await reqTeamUserInfo(params)
    const { success, data, message: msg } = res
    if (success && data) {
      // 修改数据结构
      const _data = Object.entries(data)
      setTeamUserInfo(_data)
      originalTeamUserInfoRef.current = _data
      // 初始化设置有哪些是被勾选上的
      const o = filterCheckedUser(_data)
      setCheckedObj(o)
    } else {
      message.error(msg || '获取团队成员信息失败')
    }
  }

  function filterCheckedUser(data) {
    const _checkedObj = {}
    data.forEach((team) => {
      const [deptName, userList] = team
      const checkedList = userList
        .map((user) => user.teamFlag && user.uuid)
        .filter(Boolean)
      if (checkedList.length) {
        _checkedObj[deptName] = checkedList
      }
    })
    return _checkedObj
  }

  function flatCheckedObj(obj) {
    const deptNames = Object.keys(obj)
    const result = []
    deptNames.forEach((deptName) => {
      const checkUserList = checkedObj[deptName]
      result.push(...checkUserList)
    })
    return result
  }

  async function handleOk() {
    const params = {
      teamUuid: record.uuid,
      userUuid: flatCheckedObj(checkedObj),
    }
    const res = await reqSubmitTeamUserInfo(params)
    const { success, data, message: msg } = res
    if (success && data) {
      message.success('管理用户成功')
      onSuccess()
      handleCancel()
    } else {
      message.error(msg || '管理用户失败')
    }
  }

  const { checkAll, checkedLength } = useMemo(() => {
    // 部门数量
    const teamUserInfoLength = Object.keys(teamUserInfo).length
    if (!teamUserInfoLength) {
      return { checkAll: false, checkedLength: 0 }
    }
    // 判断用户数量
    const allLength = teamUserInfo.reduce((prev, team) => {
      prev += team[1].length
      return prev
    }, 0)
    const checkedLength = Object.keys(checkedObj).reduce((prev, deptName) => {
      prev += checkedObj[deptName].length
      return prev
    }, 0)
    return {
      checkAll: allLength === checkedLength,
      checkedLength,
    }
  }, [checkedObj])

  // 清空
  function handleClear() {
    setCheckedObj({})
  }

  function handleDelUser(deptName, userUuid) {
    const o = { ...checkedObj }
    o[deptName] = o[deptName].filter((uuid) => uuid !== userUuid)
    setCheckedObj(o)
  }

  function onSearch() {
    const result = []
    originalTeamUserInfoRef.current.forEach((team) => {
      const [deptName, userList] = team
      const list = userList.filter((user) =>
        user.nickName.toUpperCase().includes(searchValue.toUpperCase())
      )
      if (list.length) {
        result.push([deptName, list])
      }
    })
    setTeamUserInfo(result)
  }

  return (
    <Modal
      width={600}
      className={styles.manageModal}
      title="管理用户"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ disabled: !checkedLength }}>
      <div className={styles.box}>
        <div className={styles.left}>
          <div>
            <Input
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={onSearch}
              value={searchValue}
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
              {teamUserInfo.map((team) => {
                const [deptName, userList] = team
                const options = userList.map((item) => ({
                  label: (
                    <Space>
                      <Avatar src={item.headImg} size={20} />
                      <Typography.Text>{item.nickName}</Typography.Text>
                    </Space>
                  ),
                  value: item.uuid,
                }))
                return (
                  <div key={deptName}>
                    <div className={styles.head}>{deptName}</div>
                    <Checkbox.Group
                      className={styles.group}
                      options={options}
                      value={checkedObj[deptName]}
                      onChange={(values) => onUserChange(deptName, values)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.head}>
            <div>
              已选
              <span>{checkedLength}</span>人
            </div>
            <div className={styles.clearBtn} onClick={handleClear}>
              <DeleteOutlined />
              <span>清空</span>
            </div>
          </div>
          <div className={styles.userList}>
            {teamUserInfo.map((team) => {
              const [deptName, userList] = team
              // 对应部门当前被选中的用户uuid集合
              const checkList = checkedObj[deptName] || []
              return userList.map((item) =>
                checkList.includes(item.uuid) ? (
                  <div
                    key={item.uuid}
                    className={styles.checkedUser}
                    onMouseEnter={() => setHoverUser(item.uuid)}
                    onMouseLeave={() => setHoverUser()}>
                    <Avatar src={item.headImg} size={20} />
                    <Typography.Text>{item.nickName}</Typography.Text>
                    {hoverUser === item.uuid && (
                      <CloseCircleFilled
                        onClick={() => handleDelUser(deptName, item.uuid)}
                      />
                    )}
                  </div>
                ) : null
              )
            })}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default forwardRef(UserManageModal)
