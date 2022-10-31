import {
  Input,
  Select,
  Button,
  Table,
  message,
  Avatar,
  Space,
  Drawer,
} from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.less'
import IconSearch from './img/icon-search.svg'
import { reqUserManage, reqUserNum } from '@/api/companyManage'
import {
  CloseCircleOutlined,
  PlusOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { CHARACTER_TYPE_CONFIG } from './sourceData'

function UserManage() {
  const userManageDrawerRef = useRef()

  const { Option } = Select
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const suffix = (
    <div>
      <CloseCircleOutlined style={{ color: '#fff' }} />
      <img src={IconSearch} alt="" />
    </div>
  )
  function renderNickName(record) {
    return (
      <Space>
        <Avatar src={record.headUrl} />
        <span>{record.nickName}</span>
      </Space>
    )
  }

  // 任务内容列表接口请求参数
  const [params, setParams] = useState({
    current: 1,
    size: 15,
  })
  // 各部门人数接口请求参数
  const [numParams, setNumParams] = useState({})
  // 列表数据
  const [tableData, setTableData] = useState({
    list: [],
    total: 0,
  })

  function filterDeptCountList(list) {
    if (!list || !list.length) return {}
    const result = {}
    list.forEach((item) => {
      const [key, value] = Object.entries(item)[0]
      const o = value
      result[key] = o
      // console.log(result)
    })
    return result
  }
  useEffect(() => {
    reqUserManage(params).then((res) => {
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
  }, [params])
  useEffect(() => {
    reqUserNum(numParams).then((res) => {
      // console.log('numParams', numParams)
      const { data, success, message: msg } = res
      if (success && data) {
        const _deptCountList = filterDeptCountList(data.deptCountList)
        setTableData({ ...data, deptCountList: _deptCountList })
      } else {
        message.error(msg || '获取各部门人数失败')
      }
    })
  }, [numParams])

  function onTableChange(pagin, filters, sorter) {
    const o = { ...params }
    console.log(pagin)
    const { current, pageSize } = pagin
    o.page = {
      pageNo: current,
      pageSize,
    }
    setParams(o)
  }
  function handleDepClick(value) {
    console.log(value)
  }

  function renderInName(inName) {
    return inName ? (
      <Space className={styles.inName}>
        {inName}
        <EditOutlined
          className={styles.icon}
          style={{
            visibility: 'hidden',
          }}
        />
      </Space>
    ) : (
      '-'
    )
  }
  function renderDeptName(deptName) {
    return deptName ? (
      <Space className={styles.inName}>
        {deptName}
        <EditOutlined
          className={styles.icon}
          style={{
            visibility: 'hidden',
          }}
        />
      </Space>
    ) : (
      '-'
    )
  }
  function renderTeam(team) {
    return team ? (
      <Space className={styles.inName}>
        {team}
        <EditOutlined
          className={styles.icon}
          style={{
            visibility: 'hidden',
          }}
        />
      </Space>
    ) : (
      '-'
    )
  }

  const columns = [
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      ellipsis: true,
      width: 100,
      render: (_, record) => renderNickName(record),
    },
    {
      title: '用户姓名',
      dataIndex: 'inName',
      key: 'inName',
      ellipsis: true,
      width: 100,
      render: (text) => renderInName(text),
    },
    {
      title: '所属部门',
      dataIndex: 'deptName',
      key: 'deptName',
      ellipsis: true,
      width: 170,
      render: (text) => renderDeptName(text),
    },
    {
      title: '所属团队',
      dataIndex: 'team',
      key: 'team',
      ellipsis: true,
      width: 100,
      render: (text) => renderTeam(text),
    },
    {
      title: '角色类型',
      dataIndex: 'roleName',
      key: 'roleName',
      ellipsis: true,
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      ellipsis: true,
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'edit',
      key: 'edit',
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <>
          <span onClick={() => userManageDrawerRef.current.open(record)}>
            编辑
          </span>
          <span>解绑</span>
        </>
      ),
    },
  ]
  const { deptCountList = {} } = numParams

  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        <div className={styles.leftItem}>
          <Space style={{ gap: '16px' }}>
            <span className={styles.depName}>全部</span>
            <span>{tableData.total}</span>
          </Space>
        </div>
        <div className={styles.leftItem}>
          <div
            className={styles.depName}
            onClick={() => handleDepClick(deptCountList.uuid)}>
            {deptCountList.deptName}
            {/* <span>{data.count}</span> */}
          </div>
        </div>
      </div>
      <div className={styles.rightBox}>
        <div className={styles.header}>
          <div className={styles.filter}>
            <div className={styles.userSearch}>
              <span>用户搜索</span>
              <Input
                suffix={suffix}
                placeholder="请输入用户昵称或姓名进行搜索"
              />
            </div>
            <div className={styles.characterType}>
              <span>角色类型</span>
              <Select
                placeholder="请选择角色类型"
                style={{
                  width: 224,
                }}>
                {CHARACTER_TYPE_CONFIG.map((item) => (
                  <Option value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </div>
            <div className={styles.clearFilter}>清空筛选</div>
          </div>
          <div className={styles.btnGroup}>
            <Button>批量处理</Button>
            <Button>
              <PlusOutlined />
              <span>添加子账号</span>
            </Button>
          </div>
        </div>
        <div className={styles.table}>
          <Table
            rowKey="uuid"
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
      <Drawer ref={userManageDrawerRef} />
    </div>
  )
}
export default UserManage
