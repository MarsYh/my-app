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
  // 当前选中的用户id
  const [checkedObj, setCheckedObj] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 初始数据
  const originalTeamUserInfoRef = useRef([])
  // 团队用户数据
  const [teamUserInfo, setTeamUserInfo] = useState([])
  const [record, setRecord] = useState({})
  // 右侧列表当前hover的值
  const [hover, setHover] = useState()
  // 搜索
  const [searchValue, setSearchValue] = useState()

  // 全选
  function onCheckAllChange(e) {
    const { checked } = e.target
    const o = {}
    if (checked) {
      teamUserInfo.forEach((team) => {
        const [deptName, userList] = team
        // 被选部门里的uuid等于数据里的uuid 证明被选中
        o[deptName] = userList.map((item) => item.uuid)
      })
    }
    setCheckedObj(o)
  }

  // 选中
  function onUserChange(deptName, checkedValues) {
    const o = { ...checkedObj }
    o[deptName] = checkedValues
    setCheckedObj(o)
  }

  function handleCancel() {
    setCheckedObj({})
    setTeamUserInfo([])
    setIsModalOpen(false)
    setTeamUserInfo([])
    setCheckedObj({})
    originalTeamUserInfoRef.current = []
    setSearchValue()
  }
  useImperativeHandle(ref, () => {
    return {
      open(record) {
        setIsModalOpen(true)
        setRecord(record)
        getTeamUserInfo({ uuid: record.uuid })
      },
    }
  })
  async function getTeamUserInfo(uuid) {
    const res = await reqTeamUserInfo(uuid)
    const { success, data, message: msg } = res
    if (success && data) {
      const _data = Object.entries(data)
      setTeamUserInfo(_data)
      originalTeamUserInfoRef.current = _data
      // 初始化设置的时候有哪些是被勾选上的
      const o = filterCheckedUser(_data)
      setCheckedObj(o)
    } else {
      message.error(msg || '获取团队用户信息失败')
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

  // 计算勾选返回结果
  const { checkAll, checkedLength } = useMemo(() => {
    // 如果原始数据数组没有长度
    const teamUserInfoLength = Object.keys(teamUserInfo).length
    if (!teamUserInfoLength) {
      return { checkAll: false, checkedLength: 0 }
    }
    // 判断全部选中的长度
    const allLength = teamUserInfo.reduce((prev, team) => {
      prev += team[1].length
      return prev
    }, 0)
    // 判断被选中的部门长度
    const checkedLength = Object.keys(checkedObj).reduce((prev, deptName) => {
      prev += checkedObj[deptName].length
      return prev
    }, 0)
    return {
      checkAll: allLength === checkedLength,
      checkedLength,
    }
  }, [checkedObj])

  function onSearch() {
    const result = []
    originalTeamUserInfoRef.current.forEach((team) => {
      const [deptName, userList] = team
      const includeList = userList.filter((user) =>
        user.nickName.toUpperCase().includes(searchValue.toUpperCase())
      )
      if (includeList.length) {
        result.push([deptName, includeList])
      }
    })
    setTeamUserInfo(result)
  }

  function flatCheckedObj(obj) {
    const deptNames = Object.keys(obj)
    const result = []
    deptNames.forEach((deptName) => {
      const checkedUserList = checkedObj[deptName]
      result.push(...checkedUserList)
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
      onSuccess()
      setIsModalOpen(false)
      message.success('管理用户成功')
    } else {
      message.error(msg || '管理用户失败')
    }
  }

  function handleDelUser(deptName, userUuid) {
    const o = { ...checkedObj }
    o[deptName] = o[deptName].filter((uuid) => uuid !== userUuid)
    setCheckedObj(o)
  }

  function handleClear() {
    setCheckedObj({})
  }
  return (
    <Modal
      width={600}
      className={styles.manageModal}
      title="管理用户"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        disabled: !checkedLength,
      }}>
      <div className={styles.box}>
        <div className={styles.left}>
          <div>
            <Input
              value={searchValue}
              onPressEnter={onSearch}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="输入名称搜索"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={onSearch}
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
              // 对应部门当前被选中的uuid集合
              const checkList = checkedObj[deptName] || []
              return userList.map((item) =>
                checkList.includes(item.uuid) ? (
                  <div
                    className={styles.checkedUser}
                    key={item.uuid}
                    onMouseEnter={() => setHover(item.uuid)}
                    onMouseLeave={() => setHover()}>
                    <Avatar src={item.headImg} size={20} />
                    <Typography.Text>{item.nickName}</Typography.Text>
                    {hover === item.uuid && (
                      <CloseCircleFilled
                        size={40}
                        className={styles.closeBtn}
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
