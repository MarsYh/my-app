// 小红书列表
import { Tag, Table, Space, Avatar, Divider, Button } from 'antd'
import React, { useState } from 'react'
import styles from './index.module.less'
import IconGift from '../../../../assets/img/icon-gift.svg'
import IconShopCart from '../../../../assets/img/icon-shopcart.svg'
import IconMCN from '../../../../assets/img/icon-mcn.svg'
import IconSexual from '../../../../assets/img/icon-sexual.svg'
const columns = [
  {
    title: '达人信息',
    fixed: 'left',
    width: 350,
    ellipsis: true,
    dataIndex: 'info',
    // render 渲染标签组件 不只是静态组件 里面的参数分别是当前行的值，当前行数据
    render: (text, record) => {
      return (
        <Space>
          {/* 头像 用组件Avatar 在数据里有一个默认的headUrl头像 */}
          <Avatar src={record.headUrl} size={32} />
          <img src={IconSexual} size={14} className={styles.sex} />

          {/* 达人信息右边部分 */}
          <div className={styles.infoRight}>
            {/* 第一行基本信息 */}
            <div className={styles.baseInfo}>
              <span>{text}</span>
              {/* 标签组件 */}
              <Tag>LV3</Tag>
              <img src={IconGift} />
              <img src={IconShopCart} />
            </div>
            {/* 第二行地域信息 */}
            <div className={styles.locationInfo}>
              <span>四川成都</span>
              {/* 组件分割线 */}
              <Divider type="vertical" />
              <span>
                <img src={IconMCN} />
                大禹机构
              </span>
              {/* 组件分割线 */}
              <Divider type="vertical" />
              <span>年框签约-新榜</span>
            </div>
            {/* 第三行标签信息 */}
            <div className={styles.tagInfo}>
              <div>美妆-护肤</div>
              <div>vlog</div>
              <div>ootd</div>
              <div>+3</div>
            </div>
          </div>
        </Space>
      )
    },
  },
  {
    title: '粉丝数量',
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'num',
  },
  {
    title: '近30日图文合作笔记预期CPM',
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日图文合作笔记预期CPE',
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日阅读中位数',
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日互动中位数',
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日作品互动率',
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日作品完播率',
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日商单笔记数（合作笔记数）',
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日粉丝增长量',
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '近30日粉丝增长率',
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '图文笔记一口价',
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '视频笔记一口价',
    width: 150,
    sorter: true,
    ellipsis: true,
    dataIndex: 'address',
  },
  {
    title: '操作',
    width: 150,
    fixed: 'right',
    dataIndex: 'operate',
    render: () => {
      return (
        <div className={styles.operate}>
          <Button>+添加</Button>
        </div>
      )
    },
  },
]
const data = [
  { num: '1.6w', address: '123', info: '小明1111' },
  { num: '1.6w', address: '123', info: '小明2222' },
  { num: '1.6w', address: '123', info: '小明3333' },
  { num: '1.6w', address: '123', info: '小明4444' },
  { num: '1.6w', address: '123', info: '小明5555' },
  { num: '1.6w', address: '123', info: '小明6666' },
  { num: '1.6w', address: '123', info: '小明7777' },
  { num: '1.6w', address: '123', info: '小明8888' },
  { num: '1.6w', address: '123', info: '小明9999' },
  { num: '1.6w', address: '123', info: '小明1010' },
  { num: '1.6w', address: '123', info: '小明8888' },
  { num: '1.6w', address: '123', info: '小明9999' },
  { num: '1.6w', address: '123', info: '小明10101' },
  { num: '1.6w', address: '123', info: '小明88881' },
  { num: '1.6w', address: '123', info: '小明99991' },
  { num: '1.6w', address: '123', info: '小明10101' },
  { num: '1.6w', address: '123', info: '小明88881' },
  { num: '1.6w', address: '123', info: '小明99991' },
  { num: '1.6w', address: '123', info: '小明10101' },
]

const List = () => {
  // 更改复选框的状态
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  return (
    <div className={styles.tableBox}>
      {/* 设置水平分割线组件 */}
      <Divider />
      <div className={styles.tableHead}>
        <div>xxxx</div>
        <div>
          {/* 设置禁止选中 通过判断条件 当复选框有被选中时 按钮属性为false 不被禁止 */}
          <button className={styles.button}>自定义指标</button>
          <Button type="primary" disabled={!selectedRowKeys.length}>
            批量添加
          </Button>
        </div>
      </div>
      <Table
        // ？
        rowKey="info"
        rowSelection={{
          selectedRowKeys,
          onChange(keys) {
            setSelectedRowKeys(keys)
          },
        }}
        columns={columns}
        dataSource={data}
        // 翻页标签配置属性
        pagination={{
          showQuickJumper: true,
          showSizeChanger: [10, 20, 30, 60, 100],
          pageSize: 10,
          current: 1,
          total: data.length,
        }}
        // 列表滚动范围
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
    </div>
  )
}

export default List
