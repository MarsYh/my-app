// 小红书列表
import { Tag, Table, Space, Avatar, Divider, Button, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { PlusOutlined } from '@ant-design/icons'
import IconGift from '@/assets/img/icon-gift.svg'
import IconShopCart from '@/assets/img/icon-shopcart.svg'
import IconMCN from '@/assets/img/icon-mcn.svg'
import IconMale from '@/assets/img/icon-male.svg'
import IconFemale from '@/assets/img/icon-female.svg'
import { reqXhsList } from '@/api/resource/redBook'
import classNames from 'classnames'

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
    reqXhsList(params).then((res) => {
      const { data, page } = res.data?.data || {}
      if (data && page.totalSize) {
        setTableData({
          list: data,
          total: page.totalSize,
        })
      }
    })
  }, [params])

  function renderTitle(title) {
    return title.length > 8 ? (
      <div title={title} className={styles.title}>
        {title}
      </div>
    ) : (
      title
    )
  }
  const renderCount = (text) => {
    return text > 10000 ? `${(text / 10000).toFixed(2)}w` : text
  }
  const renderPercent = (text, num = 100) => {
    return `${(text * num).toFixed(2)}%`
  }

  function renderContentTags(tags) {
    return tags?.map((tag) => {
      const { taxonomy1_tag, taxonomy2_tags } = tag
      return taxonomy2_tags?.length ? (
        <Popover
          key={taxonomy1_tag}
          content={
            <div>
              {taxonomy2_tags.map((child2) => (
                <div key={child2}>{child2}</div>
              ))}
            </div>
          }>
          <div className={classNames(styles.contentTagFirst, styles.tagHover)}>
            {taxonomy1_tag}
          </div>
        </Popover>
      ) : (
        <div key={taxonomy1_tag} className={styles.contentTagFirst}>
          {taxonomy1_tag}
        </div>
      )
    })
  }

  function renderDefaultTags(tags) {
    return tags?.map((tag) => {
      return tag.hover ? (
        <Popover key={tag.content} content={tag.hover}>
          <div className={classNames(styles.defaultTagFirst, styles.tagHover)}>
            {tag.content}
          </div>
        </Popover>
      ) : (
        <div key={tag.content} className={styles.defaultTagFirst}>
          {tag.content}
        </div>
      )
    })
  }

  function renderUserInfo(text, record) {
    return (
      <Space className={styles.infoBox}>
        {/* 头像 用组件Avatar 在数据里有一个默认的headUrl头像 */}
        <Avatar src={record.head_photo} size={48} />
        <div className={styles.gender}>
          {record.gender === '女' && (
            <img src={IconFemale} className={styles.female} alt="" />
          )}
          {record.gender === '男' && (
            <img src={IconMale} className={styles.male} alt="" />
          )}
        </div>
        {/* 达人信息右边部分 */}
        <div className={styles.infoRight}>
          {/* 第一行基本信息 */}
          <div className={styles.baseInfo}>
            <span className={styles.name}>{text}</span>
            {/* 标签组件 */}
            <Tag>LV{record.current_level}</Tag>
            <img src={IconGift} alt="" />
            <img src={IconShopCart} alt="" />
          </div>
          {/* 第二行地域信息 */}
          <div className={styles.locationInfo}>
            <span>{record.location}</span>
            {/* 组件分割线 */}

            {record.note_sign?.name ? (
              <>
                <Divider type="vertical" />
                <span>
                  <img src={IconMCN} alt="" />
                  {record.note_sign.name}
                </span>
              </>
            ) : null}
            {/* 组件分割线 */}
            <Divider type="vertical" />
            <span>年框签约-新榜</span>
          </div>
          {record.describe ? (
            <div title={record.describe} className={styles.describe}>
              <span>简介</span>
              <span>{record.describe}</span>
            </div>
          ) : null}
          {/* 第三行标签信息 */}
          <div className={styles.tagInfo}>
            {renderContentTags(record.content_tags)}
            {renderDefaultTags(record.tagsRes)}
          </div>
        </div>
      </Space>
    )
  }

  const columns = [
    {
      title: '达人信息',
      fixed: 'left',
      width: 450,
      ellipsis: true,
      dataIndex: 'name',
      // render 渲染标签组件 不只是静态组件 里面的参数分别是当前行的值，当前行数据
      render: renderUserInfo,
    },
    {
      title: '粉丝数量',
      width: 150,
      sorter: true,
      ellipsis: true,
      dataIndex: 'fans_count',
      render: renderCount,
    },
    {
      title: renderTitle('日常笔记数'),
      width: 150,
      sorter: true,
      ellipsis: true,
      dataIndex: 'business_note_count',
    },
    {
      title: renderTitle('近30日图文合作笔记预期CPM'),
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (text, record) => {
        return record.note_metrics_data.normal_v30days_exp_cpm
      },
    },
    {
      title: renderTitle('近30日阅读中位数'),
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (text, record) => {
        return renderCount(record.note_metrics_data.normal_pv30days_read_median)
      },
    },
    {
      title: renderTitle('近30日互动中位数'),
      width: 150,
      sorter: true,
      ellipsis: true,
      dataIndex: 'normal_pv30days_engage_median',
      render: (text, record) => {
        return renderCount(
          record.note_metrics_data.normal_pv30days_engage_median
        )
      },
    },
    {
      title: renderTitle('近30日作品互动率'),
      width: 150,
      sorter: true,
      ellipsis: true,
      render: (text, record) =>
        `${record.note_metrics_data.normal_pv30days_interaction_rate}%`,
    },
    {
      title: '近30日作品完播率',
      width: 150,
      sorter: true,
      ellipsis: true,
      dataIndex: 'address',
      render: (text, record) => {
        return renderPercent(
          record.note_metrics_data.normal_pv30days_video_full_view_rate,
          1
        )
      },
    },
    {
      title: renderTitle('近30日商单笔记数（合作笔记数）'),
      width: 150,
      sorter: true,
      ellipsis: true,
      dataIndex: 'normal_pv30days_note_number',
      render: (text, record) => {
        return record.note_metrics_data.normal_pv30days_note_number
      },
    },
    {
      title: '近30日粉丝增长量',
      width: 150,
      sorter: true,
      ellipsis: true,
      dataIndex: 'fans_num_inc_last30days',
      render: renderCount,
    },
    {
      title: '近30日粉丝增长率',
      width: 150,
      sorter: true,
      ellipsis: true,
      dataIndex: 'fans_num_inc_rate_last30days',
      render: (text) => renderPercent(text),
    },
    {
      title: '图文笔记一口价',
      width: 150,
      sorter: true,
      ellipsis: true,
      dataIndex: 'picture_price',
      render: renderCount,
    },
    {
      title: '视频笔记一口价',
      width: 150,
      sorter: true,
      ellipsis: true,
      dataIndex: 'video_price',
      render: renderCount,
    },
    {
      title: '操作',
      width: 150,
      fixed: 'right',
      dataIndex: 'operate',
      render: (text, record) => (
        <div className={styles.operate}>
          <Button onClick={() => handleAdd(record)}>
            <PlusOutlined />
            添加
          </Button>
        </div>
      ),
    },
  ]

  function handleAdd(record) {
    console.log('record:', record)
  }

  function onTableChange(pagin, filters, sorter) {
    const { current, pageSize } = pagin
    setParams({
      ...params,
      page: {
        pageNo: current,
        pageSize,
      },
    })
  }

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
        showSorterTooltip={false}
        rowKey="info"
        rowSelection={{
          selectedRowKeys,
          onChange(keys) {
            setSelectedRowKeys(keys)
          },
        }}
        columns={columns}
        dataSource={tableData.list}
        onChange={onTableChange}
        // 翻页标签配置属性
        pagination={{
          showQuickJumper: true,
          showSizeChanger: [10, 20, 30, 60, 100],
          pageSize: params.page.pageSize,
          current: params.page.pageNo,
          total: tableData.total,
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
