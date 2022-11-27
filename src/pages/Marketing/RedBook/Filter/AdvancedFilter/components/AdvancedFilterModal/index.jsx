import { Modal, Tabs } from 'antd'
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import styles from './index.module.less'
import IconSenior from '../img/icon-senior.svg'
import BgSenior from '../img/bg-senior.svg'
import { ADVANCED_FILTER_CONFIG } from '../../../sourceData'
import classNames from 'classnames'
import ContentFeature from '../ContentFeature'
import KolFeature from '../KolFeature'
import Performance from '../Performance'

function AdvancedFilterModal(props, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [value, setValue] = useState({})

  function handleClick(type) {
    if (value === type) return
    setValue(type)
  }

  function handleOk() {
    setIsModalOpen(false)
  }
  function handleCancel() {
    setIsModalOpen(false)
  }
  useImperativeHandle(ref, () => {
    return {
      open(value) {
        setIsModalOpen(true)
        setValue(value)
      },
    }
  })
  return (
    <Modal
      className={styles.advancedFilterModal}
      width={1200}
      title={
        <>
          <img src={BgSenior} alt="" />
          <img src={IconSenior} alt="" className={styles.iconSenior} />
        </>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}>
      <div className={styles.left}>
        {ADVANCED_FILTER_CONFIG.map((item) => (
          <div
            className={classNames(
              styles.tabList,
              value === item.value && styles.checked
            )}
            key={item.value}
            onClick={() => handleClick(item.value)}>
            <img src={item.icon} alt="" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.right}>
        {value === '1' && <ContentFeature />}
        {value === '2' && <KolFeature />}
        {value === '3' && <Performance />}
      </div>
    </Modal>
  )
}

export default forwardRef(AdvancedFilterModal)
