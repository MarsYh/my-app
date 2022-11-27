import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.less'
import { Table, message, Popover } from 'antd'
import { reqSearchContent } from '@/api/marketing'
import IconTitle from './img/icon-title.jpg'
import IconBrand from './img/icon-brand.png'
import IconHead from './img/icon-headImg.jpg'
import IconMiddle from './img/icon-middle.svg'
import IconOfficial from './img/icon-official.png'
import IconBrandBig from './img/icon-brandBig.jpg'
import IconPayment from './img/icon-payment.svg'
import IconAnalyze from './img/icon-analyze.png'
import IconOriginal from './img/icon-original.png'
import classNames from 'classnames'
import { REDBOOK_LIST_CONFIG } from '../../sourceData'
import AnalyzeModal from './components/AnalyzeModal'
import { SearchOutlined } from '@ant-design/icons'

function List() {
  const [hover, setHover] = useState()
  const analyzeRef = useRef()
  const initParams = {
    sortFiled: 'likedCount',
    desc: true,
    page: { pageNo: 1, pageSize: 10 },
    searchFields: [],
  }
  const [params, setParams] = useState(initParams)
  const [data, setData] = useState({
    list: [],
    total: 0,
  })

  //列表接口
  useEffect(() => {
    reqSearchContent(params).then((res) => {
      const { data, message: msg, success } = res
      if (success && data) {
        const { list = [], page = {} } = data.pager
        setData({
          list: list,
          total: page.totalSize,
        })
      } else {
        message.error(msg || '获取营销内容库失败')
      }
    })
  }, [params])

  function renderContentTag() {
    const tags = REDBOOK_LIST_CONFIG
    // 小于等于三个的情况
    const preTags = tags.slice(0, 3)
    const preDom = preTags.map((item) => (
      <Popover key={item.value} content={item.label}>
        <div
          onMouseEnter={() => setHover(item.value)}
          onMouseLeave={() => setHover()}
          className={classNames(
            styles.tags,
            styles.pointer,
            hover === item.value && styles.tagHover
          )}>
          <span className={classNames(styles.tag)}>{item.label}</span>
          {hover === item.value && (
            <SearchOutlined className={styles.iconSearch} />
          )}
        </div>
      </Popover>
    ))
    // 剩下的tags
    const restTags = tags.slice(3)
    const restDom = (
      <Popover
        content={restTags.map((child) => (
          <Popover
            key={child.value}
            content={<div className={styles.tags}>{child.label}</div>}>
            <div className={styles.tags}>
              <span className={styles.tag}>{child.label}</span>
            </div>
          </Popover>
        ))}>
        <div className={classNames(styles.tags, styles.pointer)}>
          <span className={styles.tag}>+{restTags.length}</span>
        </div>
      </Popover>
    )
    return [preDom, restDom]
  }

  function renderTitle() {
    return (
      <div className={styles.titleContainer}>
        <div className={classNames(styles.imgBox, styles.pointer)}>
          <img src={IconTitle} alt="" />
          <Popover content="文具手帐">
            <span className={styles.stickers}>兴趣爱好</span>
          </Popover>
          <span className={styles.duration}>00:55</span>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.titleBox}>
            <Popover content="拥有这套丙烯马克笔后，我真的省大钱了👏">
              <span
                className={classNames(
                  styles.title,
                  styles.ellipsis,
                  styles.pointer
                )}>
                拥有这套丙烯马克笔后，我真的省大钱了👏
              </span>
            </Popover>
            <div
              className={styles.brandBox}
              onMouseEnter={() => setHover('sta')}
              onMouseLeave={() => setHover()}>
              <img src={IconBrand} alt="" />
              <Popover content="STA斯塔">
                <span
                  className={classNames(
                    styles.name,
                    styles.ellipsis,
                    styles.pointer,
                    hover === 'sta' && styles.tagHover
                  )}>
                  STA斯塔
                </span>
                {hover === 'sta' && (
                  <SearchOutlined className={styles.iconSearch} />
                )}
              </Popover>
            </div>
          </div>
          <div className={styles.tagBox}>{renderContentTag()}</div>
          <div className={styles.timeBox}>
            <span>
              发布于&nbsp;<span>2022-08-10 17:30:00</span>
            </span>
          </div>
          <div className={styles.personBox}>
            <div className={classNames(styles.name, styles.pointer)}>
              <img src={IconHead} alt="" />
              <Popover content="大葱明说文具">
                <span>大葱明说文具</span>
              </Popover>
            </div>
            <div className={styles.infoTag}>
              <span className={styles.label}>
                <img src={IconMiddle} alt="" />
                腰部达人
              </span>
            </div>
          </div>
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

  function renderReadNum() {
    return <div>564.09w</div>
  }
  function renderInteractiveCount() {
    return <div>83.53w</div>
  }
  function renderLikedCount() {
    return <div>54.93w</div>
  }
  function renderCommentsCount() {
    return <div>2169</div>
  }
  function renderSharedCount() {
    return <div>2845</div>
  }
  function renderCollectedCount() {
    return <div>28.1w</div>
  }

  function renderBrand() {
    return (
      <div className={styles.brand}>
        <img src={IconBrandBig} alt="" />
        <Popover content="STA斯塔">
          <span>STA斯塔</span>
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

  function renderEdit() {
    return (
      <div className={styles.editBox}>
        <div className={styles.edit} onClick={() => analyzeRef.current?.open()}>
          <img src={IconAnalyze} alt="" />
          <span>分析</span>
        </div>
        <div className={styles.edit}>
          <img src={IconOriginal} alt="" />
          <span>原文</span>
        </div>
      </div>
    )
  }

  function onTableChange(pagin, filters, sorter) {
    const o = { ...params }
    console.log(o)

    // // 分页
    // const { current, pageSize } = pagin
    // o.page = {
    //   pageNo: current,
    //   pageSize,
    // }

    // // 排序
    // const { sortFiled, order } = sorter
    // if (order) {
    //   o.sortName = sortFiled
    //   o.sortType = order === 'desc' ? 1 : 2
    // } else {
    //   delete o.sortName
    //   delete o.sortType
    // }

    setParams(o)
  }
  const columns = [
    {
      title: '作品信息',
      width: 400,
      ellipsis: true,
      dataIndex: 'title',
      render: renderTitle,
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
      render: renderReadNum,
    },
    {
      title: '互动量',
      width: 80,
      ellipsis: true,
      dataIndex: 'interactiveCount',
      align: 'center',
      render: renderInteractiveCount,
    },
    {
      title: '点赞量',
      width: 80,
      ellipsis: true,
      dataIndex: 'likedCount',
      align: 'center',
      render: renderLikedCount,
    },
    {
      title: '评论量',
      width: 80,
      ellipsis: true,
      dataIndex: 'commentsCount',
      align: 'center',
      render: renderCommentsCount,
    },
    {
      title: '分享量',
      width: 80,
      ellipsis: true,
      dataIndex: 'sharedCount',
      align: 'center',
      render: renderSharedCount,
    },
    {
      title: '收藏量',
      width: 80,
      ellipsis: true,
      dataIndex: 'collectedCount',
      align: 'center',
      render: renderCollectedCount,
    },
    {
      title: '提及品牌',
      width: 150,
      ellipsis: true,
      dataIndex: 'cooperateBindsName',
      align: 'center',
      render: renderBrand,
    },
    {
      title: '数据趋势',
      width: 100,
      ellipsis: true,
      dataIndex: 'interactiveTrend',
      align: 'center',
    },
    {
      title: '操作',
      width: 100,
      ellipsis: true,
      dataIndex: 'edit',
      align: 'center',
      render: renderEdit,
    },
  ]
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Table
          className={styles.table}
          columns={columns}
          onChange={onTableChange}
          rowKey={'id'}
          dataSource={[123]}
          // pagination={{
          //   pageSize: data.pager.page.pageSize,
          //   current: data.pager.page.curPage,
          //   total: data.total,
          // }}
        />
      </div>
      <AnalyzeModal ref={analyzeRef} />
    </div>
  )
}

export default List
