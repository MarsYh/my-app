import {
  Input,
  Select,
  Button,
  Table,
  message,
  Avatar,
  Space,
  Typography,
} from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.less'
import IconSearch from './img/icon-search.svg'
import { reqUserManage, reqUserNum, reqRoleList } from '@/api/companyManage'
import {
  CloseCircleOutlined,
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { CHARACTER_TYPE_CONFIG } from './sourceData'
import classNames from 'classnames'
import UserManageDrawer from './components/UserManageDrawer'
import { useDebounceFn } from 'ahooks'
import UserManageModal from './components/UserManageModal'
import UserAccountModal from './components/UserAccountModal'

function UserManage() {
  const useManageModalRef = useRef()
  const userManageDrawerRef = useRef()
  const useAccountModalRef = useRef()

  const { Text, Link } = Typography
  const { Option } = Select
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [edit, setEdit] = useState()
  const [userLoading, setUserLoading] = useState(false)
  // 列表初始参数
  const initParams = {
    current: 1,
    size: 15,
  }
  // 任务内容列表接口请求参数
  const [params, setParams] = useState(initParams)
  // 部门人数
  const [deptData, setDeptData] = useState([])
  // 角色列表
  const [roleList, setRoleList] = useState([])
  // 列表数据
  const [tableData, setTableData] = useState({
    list: [],
    total: 0,
  })

  // 处理左侧部门数据
  function filterDeptCountList(list) {
    if (!list || !list.length) return []
    // 1. 算出全部
    // 2. 把全部的那条数据加入到结果列表中
    const result = []
    let sum = 0
    list.forEach((item) => {
      const { adPostBuyUserDept, count } = item
      sum += count
      const o = {
        deptName: adPostBuyUserDept.deptName,
        uuid: adPostBuyUserDept.uuid,
        count,
      }
      result.push(o)
    })
    result.unshift({ deptName: '全部', uuid: '', count: sum })
    return result
  }
  useEffect(() => {
    setUserLoading(true)
    reqUserManage(params)
      .then((res) => {
        const { data, success, message: msg } = res
        if (success && data) {
          setTableData({
            list: data.records,
            total: data.total,
          })
        } else {
          message.error(msg || '获取列表数据失败')
        }
      })
      .finally(() => setUserLoading(false))
  }, [params])

  useEffect(() => {
    // 该接口只在页面刚加载的时候运行一次 所以不用给依赖项
    reqUserNum().then((res) => {
      const { data, success, message: msg } = res
      if (success && data) {
        const _deptCountList = filterDeptCountList(data.deptCountList)
        setDeptData(_deptCountList)
      } else {
        message.error(msg || '获取各部门人数失败')
      }
    })
  }, [])

  useEffect(() => {
    // 该接口只在页面刚加载的时候运行一次 所以也不用给依赖项
    reqRoleList().then((res) => {
      const { data, success, message: msg } = res
      if (success && data) {
        // console.log('data', data)
        setRoleList(data)
      } else {
        message.error(msg || '请求角色列表失败')
      }
    })
  }, [])

  function onTableChange(pagin, filters, sorter) {
    const o = { ...params }
    const { current, pageSize } = pagin
    o.page = {
      pageNo: current,
      pageSize,
    }
    setParams(o)
  }
  function handleDepClick(value) {
    const _params = { ...params }
    // console.log(_params)
    if (value) {
      _params.deptUuid2 = value
    } else {
      delete _params.deptUuid2
    }
    setParams(_params)
  }

  function onRoleListChange(value) {
    if (params.roleUuid === value) return
    const _params = { ...params }
    _params.roleUuid = value
    setParams(_params)
  }

  // 设置防抖
  const { run } = useDebounceFn(
    (newParams) => {
      setParams(newParams)
    },
    {
      wait: 500,
    }
  )

  function onSearchChange(e) {
    const _name = e.target.value
    const newParams = { ...params }
    if (_name) {
      newParams.name = _name
    } else {
      delete newParams.name
    }
    run(newParams)
  }
  // 清空筛选
  function clearFliter() {
    setParams(initParams)
    selectedRowKeys.length && setSelectedRowKeys([])
  }
  // 渲染编辑按钮
  function renderEdit(name, record, key) {
    return name ? (
      <Space
        onClick={() => userManageDrawerRef.current.open(record, key)}
        className={styles.inName}
        onMouseEnter={() => setEdit(key)}
        onMouseLeave={() => setEdit()}>
        {name}
        <EditOutlined
          className={styles.icon}
          style={{
            visibility: edit === key ? 'visible' : 'hidden',
          }}
        />
      </Space>
    ) : (
      <Space
        className={styles.inName}
        onMouseEnter={() => setEdit(key)}
        onMouseLeave={() => setEdit()}>
        -
        <EditOutlined
          className={styles.icon}
          style={{
            visibility: edit === key ? 'visible' : 'hidden',
          }}
        />
      </Space>
    )
  }
  // 渲染用户姓名编辑按钮
  function renderEditModal(name, record, key) {
    return name ? (
      <Space
        onClick={() => useManageModalRef.current.open(record)}
        className={styles.inName}
        onMouseEnter={() => setEdit(key)}
        onMouseLeave={() => setEdit()}>
        {name}
        <EditOutlined
          className={styles.icon}
          style={{
            visibility: edit === key ? 'visible' : 'hidden',
          }}
        />
      </Space>
    ) : (
      <Space
        className={styles.inName}
        onMouseEnter={() => setEdit(key)}
        onMouseLeave={() => setEdit()}>
        -
        <EditOutlined
          className={styles.icon}
          style={{
            visibility: edit === key ? 'visible' : 'hidden',
          }}
        />
      </Space>
    )
  }

  const columns = [
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      ellipsis: true,
      width: 170,
      render: (text, { headUrl }) => (
        <Space>
          <Avatar src={headUrl} />
          <span>{text || '-'}</span>
        </Space>
      ),
    },
    {
      title: '用户姓名',
      dataIndex: 'inName',
      key: 'inName',
      ellipsis: true,
      width: 150,
      render: (text, record) => renderEditModal(text, record, 'inName'),
    },
    {
      title: '所属部门',
      dataIndex: 'deptName',
      key: 'deptName',
      ellipsis: true,
      width: 285,
      render: (text, record) => renderEdit(text, record, 'deptName'),
    },
    {
      title: '所属团队',
      dataIndex: 'team',
      key: 'team',
      ellipsis: true,
      width: 130,
      render: (text, record) => renderEdit(text, record, 'team'),
    },
    {
      title: '角色类型',
      dataIndex: 'roleName',
      key: 'roleName',
      ellipsis: true,
      width: 130,
      render: (text, record) => renderEdit(text, record, 'roleName'),
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      ellipsis: true,
      width: 180,
    },
    {
      title: '操作',
      dataIndex: 'edit',
      key: 'edit',
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <Space>
          <Link
            target="_blank"
            onClick={() => userManageDrawerRef.current.open(record, 'edit')}>
            编辑
          </Link>
          <Text type="danger" style={{ cursor: 'pointer' }}>
            解绑
          </Text>
        </Space>
      ),
    },
  ]

  function isDeptNameChecked(item) {
    // uuid匹配的情况
    if (params.deptUuid2 === item.uuid) {
      return true
    }

    // 是全部
    if (!params.deptUuid2 && item.deptName === '全部') {
      return true
    }

    return false
  }

  const suffix = (
    <div>
      <img src={IconSearch} alt="" />
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        {deptData.map((item) => (
          <div
            key={item.uuid}
            className={classNames(
              isDeptNameChecked(item) && styles.checked,
              styles.leftItem
            )}
            onClick={() => handleDepClick(item.uuid)}>
            <span className={styles.depName}>{item.deptName}</span>
            <span>{item.count}</span>
          </div>
        ))}
      </div>
      <div className={styles.rightBox}>
        <div className={styles.header}>
          <div className={styles.filter}>
            <div className={styles.userSearch}>
              <span>用户搜索</span>
              <Input
                value={params.name}
                onChange={onSearchChange}
                suffix={suffix}
                placeholder="请输入用户昵称或姓名进行搜索"
                allowClear
              />
            </div>
            <div className={styles.characterType}>
              <span>角色类型</span>
              <Select
                value={params.roleUuid}
                onChange={onRoleListChange}
                placeholder="请选择角色类型"
                style={{
                  width: 224,
                }}>
                {roleList?.map((item) => (
                  <Option key={item.roleUuid} value={item.roleUuid}>
                    {item.roleName}
                  </Option>
                ))}
              </Select>
            </div>
            <div className={styles.clearFilter} onClick={clearFliter}>
              清空筛选
            </div>
          </div>
          <div className={styles.btnGroup}>
            <Button type="primary" disabled={!selectedRowKeys.length}>
              批量处理
            </Button>
            <Button type="primary">
              <PlusOutlined />
              <span onClick={() => useAccountModalRef.current.open(roleList)}>
                添加子账号
              </span>
            </Button>
          </div>
        </div>
        <div className={styles.table}>
          <Table
            rowKey="uuid"
            loading={userLoading}
            onChange={onTableChange}
            dataSource={tableData.list}
            columns={columns}
            showSorterTooltip={false}
            rowSelection={{
              selectedRowKeys,
              onChange(keys) {
                setSelectedRowKeys(keys)
              },
            }}
          />
        </div>
      </div>
      <UserManageDrawer ref={userManageDrawerRef} />
      <UserManageModal ref={useManageModalRef} />
      <UserAccountModal ref={useAccountModalRef} />
    </div>
  )
}
export default UserManage
