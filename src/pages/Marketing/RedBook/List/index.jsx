import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.less'
import { Table, message, Popover } from 'antd'
import { reqSearchContent } from '@/api/marketing'
import IconBrand from './img/icon-brand.png'
import IconOfficial from './img/icon-official.png'
import IconPayment from './img/icon-payment.svg'
import IconAnalyze from './img/icon-analyze.png'
import IconOriginal from './img/icon-original.png'
import IconSimilar from './img/icon-similar.png'
import classNames from 'classnames'
import {
  USER_ATTRIBUTE_PIC_CONFIG,
  USER_ATTRIBUTE_TEXT_CONFIG,
} from '../../sourceData'
import AnalyzeModal from './components/AnalyzeModal'
import SimilarModal from './components/SimilarModal'
import { SearchOutlined } from '@ant-design/icons'
import { useXhsContentSearch } from '@/store/xhsContentSearch'

function List() {
  const { tableParams, dispatch } = useXhsContentSearch()
  const [tableLoading, setTableLoading] = useState(false)
  const [hover, setHover] = useState()
  const analyzeRef = useRef()
  const similarRef = useRef()
  const [data, setData] = useState({
    list: [],
    total: 0,
  })

  //列表接口
  useEffect(() => {
    setTableLoading(true)
    reqSearchContent(tableParams)
      .then((res) => {
        const { data, message: msg, success } = res
        if (success && data) {
          console.log(data)
          setData({
            list: data.pager.data,
            total: data.pager.page.totalSize,
          })
        } else {
          message.error(msg || '获取营销内容库失败')
        }
      })
      .finally(() => setTableLoading(false))
  }, [tableParams])

  function renderContentTag(tags) {
    if (!Array.isArray(tags) || !tags?.length) return null
    // 小于等于三个的情况
    const preTags = tags?.slice(0, 3)
    const preDom = preTags?.map((item) => (
      <Popover
        overlayClassName={styles.tagPopover}
        key={item}
        content={
          <div className={classNames(styles.tag, styles.pointer)}>{item}</div>
        }>
        <div
          onMouseEnter={() => setHover(item)}
          onMouseLeave={() => setHover()}
          className={classNames(
            styles.tags,
            styles.pointer,
            hover === item && styles.tagHover
          )}>
          <span className={classNames(styles.tag, styles.ellipsis)}>
            {item}
          </span>
          {hover === item && <SearchOutlined className={styles.iconSearch} />}
        </div>
      </Popover>
    ))
    // 剩下的tags
    const restTags = tags?.slice(3)
    const restDom = (
      <Popover
        content={restTags?.map((child) => (
          <Popover
            key={child}
            content={
              <div className={classNames(styles.tag, styles.pointer)}>
                {child}
              </div>
            }>
            <div
              className={classNames(
                styles.tags,
                styles.ellipsis,
                hover === child && styles.tagHover
              )}
              onMouseEnter={() => setHover(child)}
              onMouseLeave={() => setHover()}>
              <span
                className={classNames(
                  styles.tag,
                  styles.pointer,
                  styles.ellipsis
                )}>
                {child}
              </span>
              {hover === child && (
                <SearchOutlined className={styles.iconSearch} />
              )}
            </div>
          </Popover>
        ))}>
        {restTags?.length === 0 ? null : (
          <div className={classNames(styles.tags, styles.pointer)}>
            <span className={styles.tag}>+{restTags?.length}</span>
          </div>
        )}
      </Popover>
    )
    return [preDom, restDom]
  }

  function renderUserInfo(record) {
    return (
      <>
        <div className={classNames(styles.name, styles.pointer)}>
          <img src={record.images} alt="" />
          <Popover content={record.nickname}>
            <span>{record.nickname}</span>
          </Popover>
        </div>
        <div className={styles.infoTag}>
          <span className={styles.label}>
            <img src={USER_ATTRIBUTE_PIC_CONFIG[record.userAttribute]} alt="" />
            {USER_ATTRIBUTE_TEXT_CONFIG[record.userAttribute]}
          </span>
        </div>
      </>
    )
  }

  function renderTitle(record) {
    return (
      <div className={styles.titleContainer}>
        <div className={classNames(styles.imgBox, styles.pointer)}>
          <img
            src={record.cover}
            alt=""
            onClick={() => analyzeRef.current?.open(data.list)}
          />
          <Popover content={record.noteCounterTypeV2}>
            <span className={styles.stickers}>{record.noteCounterTypeV1}</span>
          </Popover>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.titleBox}>
            <Popover content={record.title}>
              <span
                onClick={() => analyzeRef.current?.open(data.list)}
                className={classNames(
                  styles.title,
                  styles.ellipsis,
                  styles.pointer
                )}>
                {record.title || '暂无作品标题'}
              </span>
            </Popover>
            <div
              className={styles.brandBox}
              onMouseEnter={() => setHover(record.id)}
              onMouseLeave={() => setHover()}>
              <img src={IconBrand} alt="" />
              <Popover content={record.cooperateBindsName}>
                <span
                  className={classNames(
                    styles.name,
                    styles.ellipsis,
                    styles.pointer,
                    hover === record.id && styles.tagHover
                  )}>
                  {record.cooperateBindsName}
                </span>
                {hover === record.id && (
                  <SearchOutlined className={styles.iconSearch} />
                )}
              </Popover>
            </div>
          </div>
          <div className={styles.tagBox}>
            {renderContentTag(record?.officialKeyword)}
          </div>
          <div className={styles.timeBox}>
            <span>
              发布于&nbsp;<span>{record.time}</span>
            </span>
          </div>
          <div className={styles.personBox}>{renderUserInfo(record.user)}</div>
        </div>
      </div>
    )
  }

  function renderType() {
    return (
      <div className={styles.type}>
        <img src={IconOfficial} alt="" />
        <span>官方报备</span>
      </div>
    )
  }

  function renderNum(text) {
    return text >= 10000
      ? `${(text / 10000).toFixed(2)}w`
      : text === 0
      ? '-'
      : text
  }

  function renderBrand(record) {
    return (
      <div className={styles.brand}>
        <img src={record.cooperateBindsImageUrl} alt="" />
        <Popover content={record.cooperateBindsName}>
          <span className={styles.ellipsis}>{record.cooperateBindsName}</span>
        </Popover>
        <Popover
          overlayClassName={styles.paymentPopover}
          placement="bottom"
          content="付费">
          <img className={styles.payment} src={IconPayment} alt="" />
        </Popover>
      </div>
    )
  }

  function renderEdit(record) {
    return (
      <div className={styles.editBox}>
        <div
          className={styles.edit}
          onClick={() => analyzeRef.current?.open(record)}>
          <img src={IconAnalyze} alt="" />
          <span>分析</span>
        </div>
        <div className={styles.edit}>
          <img src={IconOriginal} alt="" />
          <span>
            <a target="_blank" rel="noreferrer" href={record.link}>
              原文
            </a>
          </span>
        </div>
        <div
          className={styles.edit}
          onClick={() => similarRef.current?.open(record)}>
          <img src={IconSimilar} alt="" />
          <span>相似作品</span>
        </div>
      </div>
    )
  }

  function onTableChange(pagin, filters, sorter) {
    const o = { ...tableParams }
    console.log(o)

    // 分页
    const { current, pageSize } = pagin
    o.page = {
      pageNo: current,
      pageSize,
    }

    // 排序
    const { sortFiled, order } = sorter
    if (order) {
      o.sortName = sortFiled
      o.sortType = order === 'desc' ? 1 : 2
    } else {
      delete o.sortName
      delete o.sortType
    }

    dispatch(o)
  }
  const columns = [
    {
      title: '作品信息',
      width: 400,
      ellipsis: true,
      dataIndex: 'title',
      fixed: 'left',
      render: (_, record) => renderTitle(record),
    },
    {
      title: '作品类型',
      width: 100,
      ellipsis: true,
      dataIndex: 'isCooperate',
      render: renderType,
      align: 'center',
    },
    {
      title: '阅读量',
      width: 80,
      ellipsis: true,
      dataIndex: 'readNum',
      align: 'center',
      render: (text) => renderNum(text),
    },
    {
      title: '互动量',
      width: 80,
      ellipsis: true,
      dataIndex: 'interactiveCount',
      align: 'center',
      render: (text) => renderNum(text),
    },
    {
      title: '点赞量',
      width: 80,
      ellipsis: true,
      dataIndex: 'likedCount',
      align: 'center',
      render: (text) => renderNum(text),
    },
    {
      title: '评论量',
      width: 80,
      ellipsis: true,
      dataIndex: 'commentsCount',
      align: 'center',
      render: (text) => renderNum(text),
    },
    {
      title: '分享量',
      width: 80,
      ellipsis: true,
      dataIndex: 'sharedCount',
      align: 'center',
      render: (text) => renderNum(text),
    },
    {
      title: '收藏量',
      width: 80,
      ellipsis: true,
      dataIndex: 'collectedCount',
      align: 'center',
      render: (text) => renderNum(text),
    },
    {
      title: '提及品牌',
      width: 150,
      ellipsis: true,
      dataIndex: 'cooperateBindsName',
      align: 'center',
      render: (_, record) => renderBrand(record),
    },
    // {
    //   title: '数据趋势',
    //   width: 100,
    //   ellipsis: true,
    //   dataIndex: 'interactiveTrend',
    //   align: 'center',
    // },
    {
      title: '操作',
      width: 100,
      ellipsis: true,
      dataIndex: 'edit',
      align: 'center',
      fixed: 'right',
      render: (_, record) => renderEdit(record),
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Table
          loading={tableLoading}
          className={styles.table}
          columns={columns}
          onChange={onTableChange}
          rowKey={'id'}
          dataSource={data.list}
          pagination={{
            pageSize: tableParams.page.pageSize,
            current: tableParams.page.pageNo,
            total: data.total,
          }}
          scroll={{
            x: columns.reduce((prev, item) => (prev += item.width)),
            y: 600,
          }}
        />
      </div>
      <AnalyzeModal ref={analyzeRef} />
      <SimilarModal ref={similarRef} />
    </div>
  )
}

export default List
