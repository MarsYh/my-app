import { Drawer, message, Button, Table, Spin, Radio, Typography } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
  reqTaskDetail,
  reqTaskAudit,
  reqTaskRetry,
  reqSubTask,
} from '@/api/task'
import {
  TASK_CODE_CONFIG,
  PLATFORM_NUM_CONFIG,
  TASK_TYPE_CONFIG,
  SUBTASK_NUM_CONFIG,
  PLATFORM_IMGTYPE_CONFIG,
  PLATFORM_TEXTTYPE_CONFIG,
} from '../../sourceData'
import styles from './index.module.less'
import { ExclamationCircleFilled, DownloadOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { renderTaskStatus } from '../../utils'

function TaskDrawer(props, ref) {
  const { Link } = Typography

  const [open, setOpen] = useState(false)
  const [data, setData] = useState({})
  // 子任务列表数据状态
  const [subData, setSubData] = useState({
    dataSource: [],
    total: 0,
  })
  const [record, setRecord] = useState({})
  const [subTaskParams, setSubTaskParams] = useState({
    taskId: '',
    page: {
      pageNo: 1,
      pageSize: 6,
    },
  })

  // 让外层点击的时候可以获取里层的方法
  useImperativeHandle(ref, () => {
    return {
      open(record) {
        // 设置打开
        setOpen(true)
        setRecord(record)
        getTaskDetail(record.taskId)
        const params = { ...subTaskParams, taskId: record.taskId }
        setSubTaskParams(params)
        getSubTask(params)
      },
    }
  })
  const columns = [
    {
      title: '达人名称',
      width: 150,
      ellipsis: true,
      dataIndex: 'resourceName',
    },
    {
      title: '达人ID',
      width: 150,
      ellipsis: true,
      dataIndex: 'resourceId',
    },
    {
      title: '主页链接',
      width: 150,
      ellipsis: true,
      dataIndex: 'homeUrl',
    },
    {
      title: '状态',
      width: 150,
      ellipsis: true,
      dataIndex: 'taskStatus',
      render: (_, record) => renderTaskStatus(record),
    },
    {
      title: '原因',
      width: 150,
      ellipsis: true,
    },
    {
      title: '操作',
      width: 150,
      ellipsis: true,
    },
  ]
  const { statusDetail, resultData } = data
  const success = statusDetail[0]
  const failed = statusDetail[1]
  // console.log(success.success[0].official)
  // 请求数据
  function getTaskDetail(taskId) {
    reqTaskDetail({ taskId }).then((res) => {
      const { success, message: msg, data } = res
      if (success && data) {
        setData(data)
      } else {
        message.error(msg || '获取任务详情失败')
      }
    })
  }
  // 获取子任务列表
  function getSubTask(params) {
    reqSubTask(params).then((res) => {
      const { success, message: msg, data } = res
      if (success && data) {
        const { data: dataSource, page } = data
        setSubData({
          dataSource,
          total: page.totalSize,
        })
      } else {
        message.error(msg || '获取子任务列表失败')
      }
    })
  }
  //
  function onSubTaskChange(e) {
    const code = e.target.value
    if (subTaskParams.subTaskStatus === code) return
    const _subTaskParams = { ...subTaskParams }
    if (code === 0) {
      delete -subTaskParams.subTaskStatus
    } else {
      _subTaskParams.subTaskStatus = code
    }
    setSubTaskParams(_subTaskParams)
  }
  function onTableChange(pagination, filters, sorter) {
    const o = { ...subTaskParams }
    // 分页
    const { current, pageSize } = pagination
    o.page = {
      pageNo: current,
      pageSize: pageSize,
    }

    setSubTaskParams(o)
  }

  return (
    <Drawer
      closable={false}
      placement="right"
      open={open}
      onClose={() => setOpen(false)}
      width="674px"
      footer={
        <div className={styles.drawerFooter}>
          <Button className={classNames(styles.refuseBtn, styles.btn)}>
            拒绝
          </Button>
          <Button className={classNames(styles.adoptBtn, styles.btn)}>
            通过
          </Button>
        </div>
      }>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {TASK_CODE_CONFIG[record.taskTypeCode] || '-'}
        </h2>
        <p className={styles.paragraph}>
          <span>
            <ExclamationCircleFilled className={styles.icon} />
          </span>
          <span className={styles.text}>
            如最终执行结果失败，可能是输入信息有误，可在执行列表，点击编辑修改“达人名称、达人ID、主页链接”任选其一，修改后点击重试获取最新执行结果。
          </span>
        </p>
        <div className={styles.content}>
          <div className={styles.contentItem}>
            <span className={styles.taskName}>任务平台</span>
            <span>
              <img src={PLATFORM_NUM_CONFIG[record.platforms]} alt="" />
              <span>{record.platforms}</span>
            </span>
          </div>
          <div className={styles.contentItem}>
            <span className={styles.taskName}>
              {TASK_TYPE_CONFIG[record.taskTypeCode] || '-'}
            </span>
            <span>{TASK_TYPE_CONFIG[record.taskTypeCode]}</span>
          </div>
          <div className={styles.contentItem}>
            <span className={styles.taskName}>任务状态</span>
            <span className={styles.taskStatus}>
              {renderTaskStatus(record)}
            </span>
          </div>
          <div className={styles.contentItem}>
            <span className={styles.taskName}>最终执行结果</span>
            <div className={styles.customResult}>
              <p className={styles.resultBox}>
                <p>
                  <img
                    src={PLATFORM_IMGTYPE_CONFIG[record.platforms] || ''}
                    alt=""
                  />
                  <text>
                    {PLATFORM_TEXTTYPE_CONFIG[record.platforms] || ''}
                  </text>
                </p>
                <p>
                  <span>
                    成功&nbsp;
                    <span className={styles.success}>
                      {success.success[0].official || 0}
                    </span>
                  </span>
                  <span>
                    失败&nbsp;
                    <span className={styles.failed}>
                      {failed.failed[0].official || 0}
                    </span>
                  </span>
                </p>
              </p>
              <p className={styles.resultBox}>
                <p>非{PLATFORM_TEXTTYPE_CONFIG[record.platforms] || ''}</p>
                <p>
                  <span>
                    成功&nbsp;
                    <span className={styles.success}>
                      {success.success[0].unOfficial || 0}
                    </span>
                  </span>
                  <span>
                    失败&nbsp;
                    <span className={styles.failed}>
                      {failed.failed[0].unOfficial || 0}
                    </span>
                  </span>
                </p>
              </p>
              <p className={styles.resultBox}>
                <p>未知</p>
                <p>
                  <span>
                    失败&nbsp;
                    <span className={styles.failed}>
                      {failed.failed[0].unknown || 0}
                    </span>
                  </span>
                </p>
              </p>
            </div>
          </div>
          <div className={styles.contentItem}>
            <span className={styles.taskName}>下载执行结果</span>
            <div className={styles.downloadResultGap}>
              <div className={styles.downloadResult}>
                <span className={styles.download}>
                  <DownloadOutlined
                    style={{ marginRight: '4px', color: 'rgb(112, 126, 255)' }}
                  />
                  {resultData[0].size}
                </span>
                <span className={styles.resultBox}>
                  <span>
                    成功&nbsp;
                    <span className={styles.success}>
                      {resultData[0].successNum}
                    </span>
                  </span>
                  <span>
                    失败&nbsp;
                    <span className={styles.failed}>{resultData[0].naNum}</span>
                  </span>
                </span>
                <span className={styles.time}>{resultData[0].dateTime}</span>
              </div>
            </div>
          </div>
          <div className={styles.contentItem}>
            <span className={styles.taskName}>创建人</span>
            <span>{record.createUser}</span>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <p>执行列表</p>
            <div>
              <Radio.Group onChange={onSubTaskChange}>
                {SUBTASK_NUM_CONFIG.map((item) => (
                  <Radio value={item.value} key={item.value}>
                    {item.lable}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
          <Table
            onChange={onTableChange}
            // 翻页标签配置属性
            pagination={{
              showQuickJumper: true,
              showSizeChanger: [10, 20],
              pageSize: subTaskParams.page.pageSize,
              current: subTaskParams.page.pageNo,
              total: subData.total,
            }}
            columns={columns}
            rowKey="subTaskId"
            dataSource={subData.dataSource}
          />
        </div>
      </div>
    </Drawer>
  )
}

export default forwardRef(TaskDrawer)
