import { Button, Input, Table, message, Popover } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import styles from './index.module.less'
import { PlusOutlined } from '@ant-design/icons'
import IconSearch from '../UserManage/img/icon-search.svg'
import { reqDeptList } from '@/api/companyManage'
import AddDeptModal from './components/AddDeptModal'
import { useDebounceFn } from 'ahooks'
import RemoveDeptModal from './components/RemoveDeptModal'
import UserManageModal from './components/UserManageModal'

function DeptManage() {
  // 列表初始参数
  const initParams = {
    current: 1,
    size: 10,
  }
  // 部门列表
  const [params, setParams] = useState(initParams)
  // 部门数据
  const [data, setData] = useState({
    list: [],
    total: 0,
  })
  const addDeptRef = useRef()
  const removeDeptRef = useRef()
  const userManageRef = useRef()
  const [deptListLoading, setDeptListLoading] = useState(false)

  useEffect(() => {
    setDeptListLoading(true)
    reqDeptList(params)
      .then((res) => {
        const { data, success, message: msg } = res
        if (success && data) {
          setData({
            list: data.records,
            total: data.total,
          })
        } else {
          message.error(msg || '获取部门列表失败')
        }
      })
      .finally(() => setDeptListLoading(false))
  }, [params])

  function onTableChange(pagin, filters, sorter) {
    const o = { ...params }
    const { current, pageSize } = pagin
    o.current = current 
    o.size = pageSize
    setParams(o)
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
      newParams.deptName = _name
    } else {
      delete newParams.deptName
    }
    run(newParams)
  }

  function onSuccess() {
    setParams({...params})
  }

  const _uuid = data.list.map((item) => item.uuid)

  function renderEdit(record) {
    return (
      <div className={styles.tableEdit}>
        <span onClick={() => userManageRef.current?.open(_uuid)}>管理用户</span>
        <span className={styles.ellipsis}>
          <Popover
            overlayClassName={styles.popoverBox}
            placement="bottom"
            content={
              <div className={styles.popoverEdit}>
                <div
                  onClick={() =>
                    addDeptRef.current?.open(
                      data.list.map((item) => item),
                      'edit'
                    )
                  }>
                  编辑
                </div>
                <div onClick={() => removeDeptRef.current?.open(record)}>
                  删除
                </div>
              </div>
            }>
            <span>...</span>
          </Popover>
        </span>
      </div>
    )
  }

  const columns = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      ellipsis: true,
      width: 130,
    },
    {
      title: '部门人数',
      dataIndex: 'persons',
      key: 'persons',
      ellipsis: true,
      width: 130,
    },
    {
      title: '部门人数占比',
      dataIndex: 'rate',
      key: 'rate',
      ellipsis: true,
      width: 150,
      render: (text) => `${text * 100}%`,
    },
    {
      title: '部门负责人',
      dataIndex: 'leader',
      key: 'leader',
      ellipsis: true,
      width: 130,
      render: (text) => text || '-',
    },
    {
      title: '部门创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      ellipsis: true,
      width: 200,
    },
    {
      title: '操作',
      dataIndex: 'edit',
      key: 'edit',
      ellipsis: true,
      width: 80,
      style: { textAlign: 'center' },
      render: (_, record) => renderEdit(record),
    },
  ]

  const suffix = (
    <div style={{ cursor: 'pointer' }}>
      <img src={IconSearch} alt="" />
    </div>
  )
  return (
    <div className={styles.container}>
      <div className={styles.deptHead}>
        <div className={styles.searchBox}>
          <Input
            value={params.deptName}
            className={styles.inputBox}
            onChange={onSearchChange}
            suffix={suffix}
            addonBefore="部门搜索"
            placeholder="请输入部门名称进行搜索"
            allowClear
          />
        </div>
        <Button
          type="primary"
          onClick={() => addDeptRef.current.open(data.list, 'rebuild')}>
          <PlusOutlined />
          <span>新建部门</span>
        </Button>
      </div>
      <div className={styles.tableBox}>
        <Table
          rowKey={'uuid'}
          loading={deptListLoading}
          onChange={onTableChange}
          pagination={{
            pageSize: data.pageSize,
            current: data.current,
            total: data.total,
          }}
          dataSource={data.list}
          columns={columns}
          showSorterTooltip={false}
        />
      </div>
      <AddDeptModal ref={addDeptRef} onSuccess={onSuccess} />
      <RemoveDeptModal ref={removeDeptRef} onSuccess={onSuccess} />
      <UserManageModal ref={userManageRef} />
    </div>
  )
}

export default DeptManage
