// 小红书列表
import {
  Tag,
  Table,
  Space,
  Avatar,
  Divider,
  Button,
  Popover,
  Tooltip,
  message,
} from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { PlusOutlined } from '@ant-design/icons'
import IconGift from '@/assets/img/icon-gift.svg'
import IconShopCart from '@/assets/img/icon-shopcart.svg'
import IconMCN from '@/assets/img/icon-mcn.svg'
import IconMale from '@/assets/img/icon-male.svg'
import IconFemale from '@/assets/img/icon-female.svg'
import { reqXhsList } from '@/api/resource/'
import classNames from 'classnames'
import IconPGY from '@/assets/img/icon-pugongying.svg'
import { ATTRIBUTE_CONFIG } from './sourceData'
import IconVerify from '@/assets/img/icon-verify.svg'
import IconEst from '@/assets/img/icon-estimate.svg'
import IconEstText from '@/assets/img/icon-estimate-text.svg'
import IconOff from '@/assets/img/icon-official.svg'
import IconOffText from '@/assets/img/icon-official-text.svg'
import { useNavigate } from 'react-router-dom'

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

  const navigate = useNavigate()

  useEffect(() => {
    reqXhsList(params).then((res) => {
      const { data, success,msg } = res
      if (data && success) {
        setTableData({
          list: data.data,
          total: data.page.totalSize,
        })
      }else{
        message.error(msg || "获取列表数据失败")
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
          <div
            className={classNames(styles.contentTagFirst, styles.cursorHover)}>
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
    // 判断数组长度
    if (!Array.isArray(tags) || !tags?.length) return null
    if (tags.length === 1)
      return tags[0].hover ? (
        <Popover content={tags[0].hover}>
          <div
            className={classNames(styles.defaultTagFirst, styles.cursorHover)}>
            {tags[0].content}
          </div>
        </Popover>
      ) : (
        <div className={styles.defaultTagFirst}>{tags[0].content}</div>
      )

    // 大于1个的情况

    const firstTags = tags.slice(0, 1)[0]
    const firstDom = firstTags.hover ? (
      <Popover content={firstTags.hover}>
        <div className={classNames(styles.defaultTagFirst, styles.cursorHover)}>
          {firstTags.content}
        </div>
      </Popover>
    ) : (
      <div className={styles.defaultTagFirst}>{firstTags.content}</div>
    )
    // 剩余的dom
    const restTags = tags.slice(1)
    const restDom = (
      <Popover
        content={restTags.map((child) =>
          child.hover ? (
            <Tooltip
              placement="right"
              className={styles.defaultSecondTitle}
              key={child.content}
              title={child.hover}>
              <div className={styles.cursorHover}>{child.content}</div>
            </Tooltip>
          ) : (
            <div key={child.content}>{child.content}</div>
          )
        )}>
        <div className={classNames(styles.cursorHover, styles.defaultTagFirst)}>
          +{restTags.length}
        </div>
      </Popover>
    )
    return [firstDom, restDom]
  }
  function renderAttrIcon(attr) {
    const url = ATTRIBUTE_CONFIG[attr]
    return url ? (
      <div className={styles.attrIcon}>
        <img src={url} alt="" />
        <span>{attr}</span>
      </div>
    ) : null
  }

  // 跳转到详情页
  function handleGoDetail(record) {
    navigate(`/resourceDetail/redbookDetail/${record.user_id}?type=spread_performance`, {
      state: record,
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
            <span
              onClick={() => handleGoDetail(record)}
              className={styles.name}>
              {text}
            </span>
            {/* 标签组件 */}
            <Tag>LV{record.current_level}</Tag>
            <Popover content="支持好物推荐，通过选品中心带货，按照销售额计算佣金">
              <img className={styles.cursorHover} src={IconGift} alt="" />
            </Popover>
            <Popover content="支持带货">
              <img className={styles.cursorHover} src={IconShopCart} alt="" />
            </Popover>
            {record.source_form === 1 ? (
              <Popover content="蒲公英达人">
                <img className={styles.cursorHover} src={IconPGY} alt="" />
              </Popover>
            ) : null}
            {renderAttrIcon(record.user_attribute)}
          </div>
          {/* 第二行地域信息 */}
          <div className={styles.locationInfo}>
            <span>
              <span className={styles.id}>ID</span>
              {record.red_id}
            </span>
            {/* 组件分割线 */}
            {record.location ? (
              <>
                <Divider type="vertical" />
                <span>{record.location}</span>
              </>
            ) : null}
            {record.ip_location ? (
              <>
                <Divider type="vertical" />
                <span>IP属地 {record.ip_location}</span>
              </>
            ) : null}

            {record.note_sign?.name ? (
              <>
                <Divider type="vertical" />
                <span>
                  <img src={IconMCN} alt="" />
                  {record.note_sign.name}
                </span>
              </>
            ) : null}
          </div>
          {record.describe ? (
            <div title={record.describe} className={styles.describe}>
              <span>简介</span>
              <span>{record.describe}</span>
            </div>
          ) : null}
          {/* {第三行认证信息} */}
          {record.official_verify ? (
            <div className={styles.verify}>
              <img src={IconVerify} alt="" />
              <span>{record.official_verify}</span>
            </div>
          ) : null}

          {/* 第四行标签信息 */}
          <div className={styles.tagInfo}>
            {renderContentTags(record.content_tags)}
            {renderDefaultTags(record.tagsRes)}
          </div>
        </div>
      </Space>
    )
  }
  function renderPrice(text, record) {
    const { source_form, picture_price, video_price } = record
    return picture_price ? (
      <Popover
        placement="left"
        content={
          <div>
            <div>
              {source_form === 1 ? (
                <div>
                  <img className={styles.icon} src={IconOff} alt="" />
                  <img src={IconOffText} alt="" />
                </div>
              ) : (
                <div>
                  <img className={styles.icon} src={IconEst} alt="" />
                  <img src={IconEstText} alt="" />
                </div>
              )}
            </div>
            <div className={styles.price}>
              图文一口价：
              <span style={{ color: 'rgb(112, 126, 255)' }}>
                ¥ {(picture_price / 10000).toFixed(2)}w
              </span>
            </div>
            <div className={styles.price}>
              视频一口价：<span>¥ {(video_price / 10000).toFixed(2)}w</span>
            </div>
          </div>
        }>
        <div className={classNames(styles.priceTitle, styles.cursorHover)}>
          {(picture_price / 10000).toFixed(2)}w
        </div>
      </Popover>
    ) : (
      <div className={classNames(styles.priceTitle, styles.cursorHover)}>-</div>
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
      title: '推广报价',
      width: 100,
      sorter: true,
      fixed: 'right',
      // source_form picture_price, video_price
      ellipsis: true,
      dataIndex: 'video_price',
      render: renderPrice,
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
    const o = { ...params }

    // 分页
    const { current, pageSize } = pagin
    o.page = {
      pageNo: current,
      pageSize,
    }

    // 排序
    const { field, order } = sorter
    if (order) {
      o.sortName = field
      o.sortType = order === 'ascend' ? 1 : 2
    } else {
      delete o.sortName
      delete o.sortType
    }

    setParams(o)
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
