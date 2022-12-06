import { Modal, Popover, Button } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import styles from './index.module.less'
import classNames from 'classnames'
import IconBrand from '../../img/icon-brand.png'
import IconExport from '../../img/icon-export-tab.png'
import {
  USER_ATTRIBUTE_PIC_CONFIG,
  USER_ATTRIBUTE_TEXT_CONFIG,
  SIMILAR_TABS_CONFIG,
  REDBOOK_TYPE_CONFIG,
} from '../../../../sourceData'

function SimilarModal(props, ref) {
  const [record, setRecord] = useState([])
  const [active, setActive] = useState('1')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [switchKey, setSwitchKey] = useState('list')

  function handleOk() {
    setIsModalOpen(false)
  }
  function handleCancel() {
    setIsModalOpen(false)
  }
  function handleTabClick(value) {
    if (active === value) return
    setActive(value)
  }
  function handleTypeClick(type) {
    if (switchKey === type) return
    setSwitchKey(type)
  }
  useImperativeHandle(ref, () => {
    return {
      open(record) {
        setRecord(record)
        setIsModalOpen(true)
      },
    }
  })
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
        <div className={classNames(styles.tags, styles.pointer)}>
          <span className={classNames(styles.tag, styles.ellipsis)}>
            {item}
          </span>
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
            <div className={classNames(styles.tags, styles.ellipsis)}>
              <span
                className={classNames(
                  styles.tag,
                  styles.pointer,
                  styles.ellipsis
                )}>
                {child}
              </span>
            </div>
          </Popover>
        ))}>
        <div className={classNames(styles.tags, styles.pointer)}>
          <span className={styles.tag}>
            {restTags?.length === 0 ? '' : `+${restTags?.length}`}
          </span>
        </div>
      </Popover>
    )
    return [preDom, restDom]
  }
  function renderUserInfo(record) {
    return (
      <>
        <div className={classNames(styles.name, styles.pointer)}>
          <img className={styles.pointer} src={record?.images} alt="" />
          <Popover content={record?.nickname}>
            <span className={styles.pointer}>{record?.nickname}</span>
          </Popover>
        </div>
        <div className={styles.infoTag}>
          <span className={styles.label}>
            <img
              src={USER_ATTRIBUTE_PIC_CONFIG[record?.userAttribute]}
              alt=""
            />
            {USER_ATTRIBUTE_TEXT_CONFIG[record?.userAttribute]}
          </span>
        </div>
      </>
    )
  }
  return (
    <Modal
      closable={false}
      className={styles.similarModal}
      width={1440}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imgBox}>
            <img src={record.cover} alt="" />
            <Popover content={record.noteCounterTypeV2}>
              <span className={classNames(styles.sticker, styles.pointer)}>
                {record.noteCounterTypeV1}
              </span>
            </Popover>
          </div>
          <div className={styles.personalInfo}>
            <div className={styles.titleBox}>
              <Popover content={record.title}>
                <span
                  className={classNames(
                    styles.title,
                    styles.ellipsis,
                    styles.pointer
                  )}>
                  {record.title || '暂无作品标题'}
                </span>
              </Popover>
              <div className={styles.brandBox}>
                <img src={IconBrand} alt="" />
                <Popover content={record.cooperateBindsName}>
                  <span
                    className={classNames(
                      styles.name,
                      styles.ellipsis,
                      styles.pointer
                    )}>
                    {record.cooperateBindsName}
                  </span>
                </Popover>
              </div>
            </div>
            <div className={styles.tagBox}>
              <div className={styles.tagContainer}>
                {renderContentTag(record?.officialKeyword)}
              </div>
            </div>
            <div className={styles.timeBox}>
              <span>
                发布于&nbsp;<span>{record.time}</span>
              </span>
            </div>
            <div className={styles.personBox}>
              {renderUserInfo(record.user)}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={classNames(styles.pre, styles.columns)}>
            <div className={styles.box}>
              <span>
                {record.readNum > 10000
                  ? `${(record.readNum / 10000).toFixed(2)}w`
                  : record.readNum}
              </span>
              <span>阅读</span>
            </div>
            <div className={styles.box}>
              <span>
                {record.commentsCount > 10000
                  ? `${(record.commentsCount / 10000).toFixed(2)}w`
                  : record.commentsCount}
              </span>
              <span>评论</span>
            </div>
          </div>
          <div className={classNames(styles.middle, styles.columns)}>
            <div className={styles.box}>
              <span>
                {record.interactiveCount > 10000
                  ? `${(record.interactiveCount / 10000).toFixed(2)}w`
                  : record.interactiveCount}
              </span>
              <span>互动</span>
            </div>
            <div className={styles.box}>
              <span>
                {record.likedCount > 10000
                  ? `${(record.likedCount / 10000).toFixed(2)}w`
                  : record.likedCount}
              </span>
              <span>点赞</span>
            </div>
          </div>
          <div className={classNames(styles.last, styles.columns)}>
            <div className={styles.box}>
              <span>
                {record.sharedCount > 10000
                  ? `${(record.sharedCount / 10000).toFixed(2)}w`
                  : record.sharedCount}
              </span>
              <span>分享</span>
            </div>
            <div className={styles.box}>
              <span>
                {record.collectedCount >= 10000
                  ? `${(record.collectedCount / 10000).toFixed(2)}w`
                  : record.collectedCount}
              </span>
              <span>收藏</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tabsBox}>
        <div className={styles.tabs}>
          {SIMILAR_TABS_CONFIG.map((item) => (
            <div
              className={classNames(
                styles.tab,
                styles.pointer,
                active === item.value && styles.tabActive
              )}
              key={item.value}
              onClick={() => handleTabClick(item.value)}>
              {item.label}
            </div>
          ))}
        </div>
        <div className={styles.btns}>
          {REDBOOK_TYPE_CONFIG.map((item) => (
            <Button
              key={item.value}
              type="primary"
              className={switchKey === item.value && styles.hide}
              onClick={() => handleTypeClick(item.value)}>
              <img style={{ marginRight: '4px' }} src={item.icon} alt="" />
              <span>{item.label}</span>
            </Button>
          ))}
          <Button className={styles.export} type="default">
            <img src={IconExport} alt="" />
            <span>导出相似作品</span>
          </Button>
          <Button className={styles.export} type="default">
            <img src={IconExport} alt="" />
            <span>导出关联作品</span>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default forwardRef(SimilarModal)
