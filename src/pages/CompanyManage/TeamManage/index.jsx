import { Button, Input, message, Space, Table } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import styles from './index.module.less'
import IconSearch from '../UserManage/img/icon-search.svg'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { reqListTeam } from '@/api/companyManage'
import UserManageModal from '../DeptManage/components/UserManageModal'
import AddTeamModal from './components/AddTeamModal'
import RemoveTeamModal from './components/RemoveTeamModal'

function TeamManage() {
  const initParams = {
    current: 1,
    size: 20,
  }
  const [params, setParams] = useState(initParams)
  const [data, setData] = useState({
    list: [],
    total: '',
  })
  const userManageRef = useRef()
  const removeTeamRef = useRef()
  const addTeamRef = useRef()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  //列表接口
  useEffect(() => {
    reqListTeam(params).then((res) => {
      const { data, message: msg, success } = res
      if (success && data) {
        setData({
          list: data.records,
          total: data.total,
        })
      } else {
        message.error(msg || '获取团队列表失败')
      }
    })
  }, [params])

  function onTableChange(pagin, filters, sorter) {
    const o = { ...params }
    const { current, pageSize } = pagin
    o.page = {
      pageNo: current,
      pageSize,
    }
    setParams(o)
  }
  function renderEdit(record) {
    return (
      <Space>
        <span
          onClick={() => userManageRef.current?.open(record)}
          className={styles.userManage}>
          管理用户
        </span>
        <span className={styles.edit}>编辑</span>
        <span
          className={styles.delete}
          onClick={() => removeTeamRef.current?.open(record)}>
          删除
        </span>
      </Space>
    )
  }
  const columns = [
    {
      title: '团队名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 50,
    },
    {
      title: '团队人数',
      dataIndex: 'num',
      key: 'num',
      ellipsis: true,
      width: 50,
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      ellipsis: true,
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'edit',
      key: 'edit',
      ellipsis: true,
      width: 100,
      style: { textAlign: 'center' },
      render: (_, record) => renderEdit(record),
    },
  ]
  return (
    <div className={styles.container}>
      <div className={styles.teamHead}>
        <div className={styles.searchBox}>
          <Input
            className={styles.inputBox}
            allowClear
            placeholder="请输入团队名称进行搜索"
            addonBefore="用户搜索"
            suffix={<img src={IconSearch} alt="" />}
          />
        </div>
        <Space className={styles.btnGroup}>
          <Button disabled>
            <DeleteOutlined />
            <span>批量删除</span>
          </Button>
          <Button
            type="primary"
            onClick={() =>
              addTeamRef.current?.open(
                data.list.map((item) => item),
                'edit'
              )
            }>
            <PlusOutlined />
            <span>新建团队</span>
          </Button>
        </Space>
      </div>
      <div>
        <Table
          className={styles.teamTable}
          columns={columns}
          rowKey={'uuid'}
          onChange={onTableChange}
          pagination={{
            pageSize: data.pageSize,
            current: data.current,
            total: data.total,
          }}
          dataSource={data.list}
          showSorterTooltip={false}
          rowSelection={{
            selectedRowKeys,
            onChange(keys, rows) {
              setSelectedRowKeys(keys)
              setSelectedRows(rows)
            },
          }}
        />
      </div>
      <UserManageModal
        ref={userManageRef}
        onSuccess={() => setParams({ ...params })}
      />
      <AddTeamModal ref={addTeamRef} />
      <RemoveTeamModal ref={removeTeamRef} />
    </div>
  )
}

export default TeamManage
