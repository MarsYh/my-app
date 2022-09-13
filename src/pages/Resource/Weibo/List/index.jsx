import { Divider, Table, Space, Avatar, Button } from 'antd'
import React, { useState, useEffect } from 'react'
// rowSelection object indicates the need for row selection]
import { wbList } from '@/api/resource/weibo'
import styles from './index.module.less'
import IconMale from '@/assets/img/icon-male.svg'
import IconFemale from '@/assets/img/icon-female.svg'
import IconWeibo from '@/assets/img/icon-weibo.png'

const List = () => {
  // 更改复选框的状态
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  // 列表接口请求参数
  const [params, setParams] = useState({
    type: 1,
    source: 1,
    page: {
      pageSize: 20,
      pageNo: 1,
    },
  })
  // 列表数据
  const [tableData, setTableData] = useState({
    list: [],
    total: 0,
  })
  useEffect(() => {
    wbList(params).then((res) => {
      const { data, page } = res.data?.data || {}
      if (data && page.totalSize) {
        setTableData({
          list: data,
          total: page.totalSize,
        })
      }
    })
  }, [params])
  const renderCount = (text) => {
    return text > 10000 ? `${(text / 10000).toFixed(2)}w` : text
  }
  function renderContentTags() {}
  function renderUserInfo(text, record) {
    return (
      <Space className={styles.infoBox}>
        {/* 头像 */}
        <Avatar src={record.avatarLarge} size={48} />
        <div className={styles.gender}>
          {record.gender === 'f' && (
            <img src={IconFemale} className={styles.female} alt="" />
          )}
          {record.gender === 'm' && (
            <img src={IconMale} className={styles.male} alt="" />
          )}
        </div>
        {/* 达人信息右边部分 */}
        <div className={styles.infoRight}>
          {/* 第一行基本信息 */}
          <div className={styles.baseInfo}>
            <span className={styles.name}>达人</span>
            <img src={IconWeibo} alt="" />
            <span>达人</span>
          </div>
          {/* 第二行地域信息 */}
          <div className={styles.locationInfo}>
            <div>
              <span className={styles.id}>ID</span>
              {record.idStr}
            </div>
            {record.ipLocation ? (
              <>
                <Divider type="vertical" />
                {record.ipLocation}
              </>
            ) : null}
          </div>
          {/* 第三行标签信息 */}
          <div className={styles.tagInfo}>{renderContentTags(record)}</div>
        </div>
      </Space>
    )
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
    console.log(sorter)
    if (order) {
      o.sortName = field
      o.sortType = order === 'ascend' ? 1 : 2
    } else {
      delete o.sortName
      delete o.sortType
    }

    setParams(o)
  }
  const columns = [
    {
      title: '达人信息',
      dataIndex: 'name',
      width: 300,
      fixed: 'left',
      render: renderUserInfo,
    },
    {
      title: '粉丝数',
      width: 200,
      sorter: true,
      dataIndex: 'followersCount',
      render: renderCount,
    },
    {
      title: '近90天原发作品平均播放量',
      sorter: true,
      width: 200,
      dataIndex: 'originVideoActiveMedian90',
      render: renderCount,
    },
    {
      title: '近90天原发作品平均互动量',
      dataIndex: 'originVideoRepostAvg90',
      width: 200,
      sorter: true,
      render: renderCount,
    },
    {
      title: '原发作品预期CPM',
      dataIndex: 'originPredictCpm',
      width: 200,
      sorter: true,
    },
    {
      title: '原发作品预期CPE',
      dataIndex: 'originPredictCpe',
      width: 200,
      sorter: true,
    },
    {
      title: '推广报价',
      dataIndex: 'originPrice',
      fixed: 'right',
      width: 100,
      sorter: true,
      render: renderCount,
    },
    {
      title: '操作',
      dataIndex: 'address',
      width: 150,
      fixed: 'right',
      sorter: true, 
    },
  ]
  return (
    <div className={styles.tableBox}>
      {/* 设置水平分割线组件 */}
      <Divider />
      <div className={styles.tableHead}>
        <div>xxxx</div>
        <div>
          {/* 设置禁止选中 通过判断条件 当复选框有被选中时 按钮属性为false 不被禁止 */}
          <Button className={styles.button}>自定义指标</Button>
          <Button type="primary" disabled={!selectedRowKeys.length}>
            批量添加
          </Button>
        </div>
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

export default List
