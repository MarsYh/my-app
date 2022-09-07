// 小红书列表
import { Divider, Radio, Table } from 'antd'
import React, { useState } from 'react'
import styles from './index.module.less'
const columns = [
  {
    title: '达人信息',
    width: 150,
    fixed: 'left',
    ellipsis: true,
    dataIndex: 'name',
  },
  {
    title: '粉丝数量',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '客单价',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '场均销售额区间',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    width: 150,
    title: '近期带货场次',
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日图文合作笔记预期CPM',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日图文合作笔记预期CPE',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日阅读中位数',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日互动中位数',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日作品互动率',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日粉丝增长量',
    ellipsis: true,
    width: 150,
    dataIndex: 'address',
  },
  {
    title: '近30日粉丝增长率',
    ellipsis: true,
    width: 150,
    dataIndex: 'address',
  },
  {
    title: '图文笔记一口价',
    width: 150,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '视频笔记一口价',
    ellipsis: true,
    width: 150,
    dataIndex: 'address',
  },
  {
    title: '操作',
    fixed: 'right',
    width: 150,
    dataIndex: 'address',
  },
]
const data = [
  { address: '123', name: '小红' },
  { address: '123', name: '小红' },
  { address: '123', name: '小红' },
  { address: '123', name: '小红' },
  { address: '123', name: '小红' },
  { address: '123', name: '小红' },
  { address: '123', name: '小红' },
  { address: '123', name: '小红' },
  { address: '123', name: '小红' },
] // rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    )
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
}

const List = () => {
  const [selectionType, setSelectionType] = useState('checkbox')
  return (
    <div className={styles.tableBox}>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        scroll={{
          x: 500,
        }}
      />
    </div>
  )
}

export default List
