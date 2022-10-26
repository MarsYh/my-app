// 任务内容
import React, { useState, useEffect, useRef } from 'react'
import { Tabs, Table, Badge, message, Drawer, Button, Divider } from 'antd'
import styles from './index.module.less'
import IconTitle from '../img/titleBoxImg.svg'
import { reqTaskList, reqTaskNum, reqTaskDetail } from '@/api/task'
import {
  PLATFORM_NUM_CONFIG,
  PLATFORM_CODE_CONFIG,
  DATA_TYPE_CONFIG,
} from './sourceData'
import classNames from 'classnames'
import dayjs from 'dayjs'
import PlatformBtn from './components/PlatformBtn'
import DrawerItem from './components/DrawerItem'

function TaskContent() {
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

  const drawerRef = useRef()
  // 更改复选框的状态

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // 任务内容列表接口请求参数
  const [params, setParams] = useState({
    dataType: DATA_TYPE_CONFIG[0].value,
    page: {
      pageSize: 20,
      pageNo: 1,
    },
  })
  const { dataType } = params
  // 列表数据
  const [tableData, setTableData] = useState({
    list: [],
    total: 0,
  })
  // 存储平台任务数量
  const [taskNumList, setTaskNumList] = useState([])
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

  useEffect(() => {
    reqTaskNum({ dataType }).then((res) => {
      const { data, success, msg } = res
      if (success && data) {
        setTaskNumList(data)
      } else {
        message.error(msg || '获取任务数量失败')
      }
    })
  }, [dataType])

  // 抽屉效果
  const [open, setOpen] = useState(false)
  function showDrawer(data) {
    // console.log('data', data)
    setOpen(true)
    drawerRef.current.open()
  }
  const onClose = () => {
    setOpen(false)
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
  function renderEdit(data) {
    // console.log('data', data)
    return (
      <>
        <Button type="primary" onClick={() => showDrawer(data)}>
          查看详情
        </Button>
        <Drawer placement="right" onClose={onClose} open={open}>
          <DrawerItem ref={drawerRef}></DrawerItem>
        </Drawer>
      </>
    )
  }
  function renderTime(time) {
    return time ? dayjs(time).format('YYYY-MM-DD') : '-'
  }

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
    if (params.dataType === value) return
    const _params = { ...params }
    _params.dataType = value
    setParams(_params)
  }

  // 此处需要判断code是否为0 因为默认全部的时候 没有platform
  function handleNumClick(name) {
    const code = PLATFORM_CODE_CONFIG[name]
    if (params.platform === code) return
    const _params = { ...params }
    if (code === 0) {
      delete _params.platform
    } else {
      _params.platform = code
    }
    setParams(_params)
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
                params.dataType === item.value && styles.active
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
        {taskNumList?.map((item) => (
          // console.log('item', item)
          <PlatformBtn
            key={item.name}
            icon={PLATFORM_NUM_CONFIG[item.name]}
            onClick={() => handleNumClick(item.name)}
            // ??双值运算符 当右边为null或undefined时 会返回右边的值
            checked={(params.platform ?? 0) === PLATFORM_CODE_CONFIG[item.name]}
            title={item.name}
            num={item.taskNum}
          />
        ))}
      </div>
      <Divider />
      <Table
        showSorterTooltip={false}
        rowKey="taskId"
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
          y: 550,
        }}
      />
    </div>
  )
}

export default TaskContent
