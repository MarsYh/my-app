// 任务内容
import React, { useState, useEffect } from 'react'
import { Tabs, Table, Badge, message, Drawer, Button } from 'antd'
import styles from './index.module.less'
import IconTitle from '../img/titleBoxImg.svg'
import { reqTaskList, reqTaskNum, reqTaskType } from '@/api/task'
import { TASK_PLATFORM_LIST, DATA_TYPE_CONFIG } from './sourceData'
import classNames from 'classnames'
import dayjs from 'dayjs'

function TaskContent() {
  // 抽屉效果
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  // 更改复选框的状态
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // 任务内容列表接口请求参数
  const [params, setParams] = useState({
    type: 1,
    source: 1,
    page: {
      pageSize: 20,
      pageNo: 1,
    },
  })
  // 类型切换请求数据
  const [typeParams, setTypeParams] = useState({
    dataType: DATA_TYPE_CONFIG[0].value,
  })
  // 列表数据
  const [tableData, setTableData] = useState({
    list: [],
    total: 0,
  })
  useEffect(() => {
    reqTaskList(params).then((res) => {
      const { data, success, msg } = res
      if (data && success) {
        setTableData({
          list: data.data,
          total: data.page.totalSize,
        })
      } else {
        message.error(msg || '获取列表数据失败')
      }
    })
  }, [params])
  // 请求任务类型数据
  useEffect(() => {
    reqTaskType(typeParams).then((res) => {
      const { data, success, msg } = res
    })
  }, [typeParams])
  const onChange = (key) => {
    // console.log(key)
  }

  function renderTaskState(data) {
    // console.log('=>', data)
    if (data.taskStatus === '执行成功') {
      return (
        <div>
          <Badge status="success" />
          <span>{data.taskStatus}</span>
        </div>
      )
    }
    if (data.taskStatus === '执行失败') {
      return (
        <div>
          <Badge status="error" />
          <span>{data.taskStatus}</span>
        </div>
      )
    }
    if (data.taskStatus === '无法执行') {
      return (
        <div>
          <Badge status="default" />
          <span>{data.taskStatus}</span>
        </div>
      )
    }
  }
  function renderEdit() {
    return (
      <>
        <Button type="primary" onClick={showDrawer}>
          查看详情
        </Button>
        <Drawer
          title="添加投放记录"
          placement="right"
          onClose={onClose}
          open={open}>
          <p>123</p>
          <p>123</p>
          <p>123</p>
        </Drawer>
      </>
    )
  }
  function renderTime(time) {
    return time ? dayjs(time).format('YYYY-MM-DD') : '-'
  }
  const columns = [
    {
      title: '任务编号',
      dataIndex: 'taskId',
      key: 'taskId',
      width: 100,
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      ellipsis: true,
      key: 'taskName',
      width: 200,
    },
    {
      title: '子任务数量',
      dataIndex: 'subTaskNum',
      sorter: true,
      key: 'sub_task_num',
      width: 120,
    },
    {
      title: '任务类型',
      key: 'taskType',
      width: 150,
      ellipsis: true,
      dataIndex: 'taskType',
    },
    {
      title: '任务平台',
      key: 'platforms',
      dataIndex: 'platforms',
      width: 100,
    },
    {
      title: '创建人',
      key: 'createUser',
      width: 150,
      dataIndex: 'createUser',
    },
    {
      title: '所属部门',
      key: 'dept',
      dataIndex: 'dept',
      width: 100,
    },
    {
      title: '创建时间',
      key: 'gmtCreate',
      dataIndex: 'gmtCreate',
      render: renderTime,
      width: 150,
    },
    {
      title: '任务状态',
      key: 'state',
      render: renderTaskState,
      width: 100,
    },
    {
      title: '操作',
      key: 'edit',
      render: renderEdit,
      width: 150,
    },
  ]
  function onTableChange(pagin, filters, sorter) {
    const o = { ...params }

    // 分页
    const { current, pageSize } = pagin
    o.page = {
      pageNo: current,
      pageSize,
    }

    // 排序
    const { field, order } = sorter
    // console.log(sorter)
    if (order) {
      o.orderBy = field
      o.order = order === 'descend' ? 'desc' : 'asc'
    } else {
      delete o.orderBy
      delete o.order
    }

    setParams(o)
  }
  function handleTypeClick(value) {
    if (typeParams.dataType === value) return
    // console.log('dpParams:', dpParams)
    const _typeParams = { ...typeParams }
    _typeParams.dataType = value
    setTypeParams(_typeParams)
  }
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <div className={styles.titleLeft}>任务中心</div>
        <img src={IconTitle} alt="" />
      </div>
      <div className={styles.dataType}>
        <div>数据类型</div>
        <div className={styles.typeList}>
          {DATA_TYPE_CONFIG.map((item) => (
            <div
              key={item.value}
              className={classNames(
                styles.taskType,
                typeParams.dataType === item.value && styles.active
              )}
              onClick={() => {
                handleTypeClick(item.value)
              }}>
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tabHeader}>
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          items={TASK_PLATFORM_LIST}
        />
      </div>
      <Table
        showSorterTooltip={false}
        rowKey="info"
        rowSelection={{
          selectedRowKeys,
          onChange(keys) {
            setSelectedRowKeys(keys)
          },
        }}
        onChange={onTableChange}
        // 翻页标签配置属性
        pagination={{
          showQuickJumper: true,
          showSizeChanger: [10, 20, 50, 100],
          pageSize: params.page.pageSize,
          current: params.page.pageNo,
          total: tableData.total,
        }}
        columns={columns}
        dataSource={tableData.list}
        scroll={{
          x: 800,
        }}
      />
    </div>
  )
}

export default TaskContent
