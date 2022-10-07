import { Divider, Table, Avatar, Button, Popover, Tooltip, message } from 'antd'
import React, { useState, useEffect } from 'react'
// rowSelection object indicates the need for row selection]
import { reqWbList } from '@/api/resource'
import styles from './index.module.less'
import IconMale from '@/assets/img/icon-male.svg'
import IconFemale from '@/assets/img/icon-female.svg'
import IconWeibo from '@/assets/img/icon-weibo.png'
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
    reqWbList(params).then((res) => {
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
  const renderCount = (text) => {
    return text > 10000 ? `${(text / 10000).toFixed(2)}w` : text
  }

  // function renderContentTags(record) {
  //   if (!record.contentFirLabel) return null
  //   return record.contentSecLabel ? (
  //     <Popover content={record.contentSecLabel}>
  //       <div className={classNames(styles.hover, styles.contentTag)}>
  //         {record.contentFirLabel}
  //       </div>
  //     </Popover>
  //   ) : (
  //     <div className={styles.contentTag}>{record.contentFirLabel}</div>
  //   )
  // }
  // function renderIndustryTags(record) {
  //   if (!record.industryLabel) return null
  //   return record.industryLabel ? (
  //     <div className={styles.industryTag}>{record.industryLabel}</div>
  //   ) : null
  // }
  // function renderPrivateTags(record) {
  //   // 判断数组是否存在      1.判断值的有无 2.判断是否小于等于三个 3.是否存在hover
  //   if (!Array.isArray(record.tagsRes) || !record.tagsRes.length) return null
  //   // 小于等于三个的情况
  //   // 封装一个数组 进行首次筛选 选出的是存在的标签 为true
  //   const preList = record.tagsRes.slice(0, 3).filter(Boolean)
  //   // 对首次筛选过的数组进行遍历，并做判断，判断里面是否存在二级标签  最后对遍历出的数组进行封装 名为result
  //   const result = preList.map((tag) =>
  //     tag.hover ? (
  //       // 存在 即Popover
  //       <Popover content={tag.hover} key={tag.content}>
  //         <div className={classNames(styles.privateTag, styles.hover)}>
  //           {tag.content}
  //         </div>
  //       </Popover>
  //     ) :
  //     // 不存在 则直接输出一级标签
  //     (
  //       <div
  //         key={tag.content}
  //         className={classNames(styles.privateTag, styles.hover)}>
  //         {tag.content}
  //       </div>
  //     )
  //   )
  //   // 大于三个
  //   // 当个人标签大于三个时，只对前三个进行展示，后面都会被收在一个的div盒子里，hover上去才会进行展示 首先进行判断
  //   if (record.tagsRes.length > 3) {
  //     // 判断个人标签大于三个后 用slice方法取到剩下的所有标签 封装成叫restList的数组
  //     const restList = record.tagsRes.slice(3)
  //     // 注意书写：
  //     const restDom = (
  //       // 这里已经是在被收起的div盒子里了 所以内容都应该写在Popover标签内
  //       <Popover
  //         key="restDom"
  //         // 这里面的内容是对剩下的标签进行遍历得到的
  //         content={restList.map((tag) =>
  //           // 对里面的标签进行判断是否有hover 有的话加上tooltip标签 使其hover显示内容
  //           tag.hover ? (
  //             <Tooltip placement="right" title={tag.hover}>
  //               <div className={classNames(styles.hoverTag, styles.hover)}>
  //                 {tag.content}
  //               </div>
  //             </Tooltip>
  //           ) :
  //           // 没有hover直接输出标签本身
  //           (
  //             <div className={classNames(styles.hoverTag, styles.hover)}>
  //               {tag.content}
  //             </div>
  //           )
  //         )}>
  //           {/* 这里显示的是+和后面标签的数量 */}
  //         <div className={classNames(styles.privateTag, styles.hover)}>
  //           +{restList.length}
  //         </div>
  //       </Popover>
  //     )
  //     // result被封装成了数组 里面包含的是当标签小于等于三个时被渲染出来的效果 因为这里的条件已经大于三个 所以要加上后面渲染出来的restDom 用数组的push方法 不用浅拷贝 因为这里restDom不是一个数组
  //     result.push(restDom)
  //   }
  //   return result
  // }

  function renderContentTags(record) {
    // 首先判断标签有无
    if (!record.contentFirLabel) return null
    // 因为已经判断过 这里肯定是有标签的 再判断是否有二级标签(hover)
    return record.contentSecLabel ? (
      <Popover content={<div>{record.contentSecLabel}</div>}>
        <div className={classNames(styles.hover, styles.contentTag)}>
          {record.contentFirLabel}
        </div>
      </Popover>
    ) : (
      <div className={classNames(styles.hover, styles.contentTag)}>
        {record.contentFirLabel}
      </div>
    )
  }

  function renderIndustryTags(record) {
    // 行业标签只会有一个 所以只用判断存不存在即可 不用判断hover
    return record.industryLabel ? (
      <div className={styles.industryTag}>{record.industryLabel}</div>
    ) : null
  }

  function renderPrivateTags(record) {
    // 判断标签是否存在
    const { tagsRes } = record
    if (!Array.isArray(tagsRes) || !tagsRes.length) return null
    // 标签小于等于三个
    const preList = tagsRes.slice(0, 3)
    const result = preList.map((tag) =>
      // 判断是否有hover
      tag.hover ? (
        <Popover key={tag.content} content={<div>{tag.hover}</div>}>
          <div>{tag.content}</div>
        </Popover>
      ) : (
        <div key={tag.content}>{tag.content}</div>
      )
    )
    // 标签大于三个
    if (tagsRes.length > 3) {
      const restList = tagsRes.slice(3)
      const restDom = (
        <Popover
          content={restList.map((tag) =>
            // 判断是否有hover
            tag.hover ? (
              <Tooltip
                key={tag.content}
                placement="right"
                title={<div>{tag.hover}</div>}>
                <div>{tag.content}</div>
              </Tooltip>
            ) : (
              <div key={tag.content}>{tag.content}</div>
            )
          )}>
          <div>+{restList.length}</div>
        </Popover>
      )
      result.push(restDom)
    }
    return result
  }
  function renderUserInfo(text, record) {
    return (
      <div className={styles.infoBox}>
        {/* 头像 */}
        <div className={styles.infoLeft}>
          <Avatar src={record.avatarLarge} size={48} />
          <div className={styles.gender}>
            {record.gender === 'f' && (
              <img src={IconFemale} className={styles.female} alt="" />
            )}
            {record.gender === 'm' && (
              <img src={IconMale} className={styles.male} alt="" />
            )}
          </div>
        </div>
        {/* 达人信息右边部分 */}
        <div className={styles.infoRight}>
          {/* 第一行基本信息 */}
          <div className={styles.baseInfo}>
            <Popover content={record.screenName}>
              <span className={styles.name}>{record.screenName}</span>
            </Popover>
            <img src={IconWeibo} alt="" />
            <span
              title={record.verifiedReason}
              className={styles.ellipsis}
              style={{ width: '150px' }}>
              {record.verifiedReason}
            </span>
          </div>
          {/* 第二行地域信息 */}
          <div className={styles.locationInfo}>
            <div className={styles.idInfo}>
              <span className={styles.id}>ID</span>
              <span>{record.idStr}</span>
            </div>
            {record.ipLocation ? (
              <>
                <Divider type="vertical" />
                {record.ipLocation}
              </>
            ) : null}
          </div>
          {/* 第三行标签信息 */}
          <div className={styles.tagBox}>
            {renderContentTags(record)}
            {renderIndustryTags(record)}
          </div>
          {/* 第四行个人标签信息 */}
          <div className={styles.privateBox}>{renderPrivateTags(record)}</div>
        </div>
      </div>
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
    // console.log(sorter)
    if (order) {
      o.sortFiled = field
      o.desc = order === 'descend'
    } else {
      delete o.sortFiled
      delete o.desc
    }

    setParams(o)
  }
  const columns = [
    {
      title: '达人信息',
      dataIndex: 'screenName',
      width: 350,
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
