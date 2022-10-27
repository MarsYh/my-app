import { Drawer, message, Badge, Button, Table, Spin } from 'antd'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { reqTaskDetail } from '@/api/task'
import {
  TASK_CODE_CONFIG,
  PLATFORM_NUM_CONFIG,
  TASK_TYPE_CONFIG,
} from '../../sourceData'
import styles from './index.module.less'
import { ExclamationCircleFilled } from '@ant-design/icons'
import classNames from 'classnames'
import IconXt from '../../img/icon-xingtu.svg'

function TaskDrawer(props, ref) {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({})
  const [record, setRecord] = useState({})

  // 让外层点击的时候可以获取里层的方法
  useImperativeHandle(ref, () => {
    return {
      open(record) {
        // 设置打开
        setOpen(true)
        // // 设置标题
        // setTitle(TASK_CODE_CONFIG[record.taskTypeCode])
        // // 设置图片
        // setImg(PLATFORM_NUM_CONFIG[record.platforms])
        // // 设置平台名
        // setPlatformName(record.platforms)
        // // 设置任务类型名
        // setTaskType(TASK_TYPE_CONFIG[record.taskTypeCode])
        // // 设置任务数量
        // setTaskNum(record.subTaskNum)
        // // 设置任务状态
        // setTaskStatus(record.taskStatus)
        setRecord(record)
        getTaskDetail(record.taskId)
      },
    }
  })
  // 请求数据
  function getTaskDetail(taskId) {
    reqTaskDetail({ taskId }).then((res) => {
      const { success, message: msg, data: params } = res
      if (success && params) {
        setData(data)
      } else {
        message.error(msg || '获取任务详情失败')
      }
    })
  }
  function renderTaskStatus() {
    const { taskStatus } = record
    if (taskStatus === '执行成功') {
      return (
        <span className={styles.taskStatus}>
          <Badge status="success" />
          <span>{taskStatus}</span>
        </span>
      )
    }
    if (taskStatus === '执行失败') {
      return (
        <div>
          <Badge status="error" />
          <span>{taskStatus}</span>
        </div>
      )
    }
    if (taskStatus === '无法执行') {
      return (
        <div>
          <Badge status="default" />
          <span>{taskStatus}</span>
        </div>
      )
    }
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
            <span className={styles.taskStatus}>{renderTaskStatus()}</span>
          </div>
          <div className={styles.contentItem}>
            <span className={styles.taskName}>最终执行结果</span>
            <div className={styles.customResult}>
              <p className={styles.resultBox}>
                <p>
                  <img src={IconXt} alt="" />
                  星图达人
                </p>
                <p>
                  <span>
                    成功
                    <span>{}</span>
                  </span>
                  <span>
                    失败
                    <span>{}</span>
                  </span>
                </p>
              </p>
              <p className={styles.resultBox}>
                <p>非星图达人</p>
                <p>
                  <span>
                    成功
                    <span>{}</span>
                  </span>
                  <span>
                    失败
                    <span>{}</span>
                  </span>
                </p>
              </p>
              <p className={styles.resultBox}>
                <p>未知</p>
                <p>
                  <span>
                    失败
                    <span>{}</span>
                  </span>
                </p>
              </p>
            </div>
          </div>
          <div className={styles.contentItem}>
            <span className={styles.taskName}>下载执行结果</span>
            <Spin>
              <div className={styles.downloadResult}>
                <div></div>
              </div>
            </Spin>
          </div>
          <div className={styles.contentItem}>
            <span className={styles.taskName}>创建人</span>
            <span></span>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHeader}></div>
          <Table />
        </div>
      </div>
    </Drawer>
  )
}

export default forwardRef(TaskDrawer)
