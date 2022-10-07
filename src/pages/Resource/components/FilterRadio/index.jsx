// 单选筛选组件
import React from 'react'
import { Popover, Button, InputNumber, Divider, Space } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useState } from 'react'
import classNames from 'classnames'

// {desc,min,max}
// gender ["全部","男","女"]

const FilterRadio = (props) => {
  const {
    title,
    options,
    isSlot = false,
    onChange,
    checked,
    minProps,
    maxProps,
    onReset,
    onOk,
    slotResetBtnProps,
    slotOkBtnProps,
    sexual,
  } = props

  const [visible, setVisible] = useState(false)

  function handleTitleClick() {
    setVisible(!visible)
  }

  function handleOptionClick(option) {
    onChange(option)
    setVisible(false)
  }

  function handleOk() {
    onOk()
    setVisible(false)
  }

  function handleReset() {
    onReset()
    setVisible(false)
  }

  return (
    <Popover
      overlayClassName={styles.popover}
      visible={visible}
      content={
        <div className={styles.content}>
          <div className={styles.sex}>
            {sexual?.map((item) => (
              <div key={item} className={styles.gender}>
                {item}
              </div>
            ))}
          </div>
          <div className={styles.optionGroup}>
            {options.map((item) => (
              <div
                key={item.desc}
                className={classNames(
                  checked?.desc === item.desc && styles.optionChecked,
                  styles.option
                )}
                onClick={() => handleOptionClick(item)}>
                {item.desc}
              </div>
            ))}
          </div>
          <Divider />
          {isSlot && (
            <div className={styles.slot}>
              <Space style={{ gap: '8px' }}>
                <InputNumber {...minProps} />
                -
                <InputNumber {...maxProps} />
              </Space>
              <div className={styles.btnGroup}>
                <Button
                  type="link"
                  onClick={handleReset}
                  {...slotResetBtnProps}>
                  重置
                </Button>
                <Button type="primary" onClick={handleOk} {...slotOkBtnProps}>
                  确认
                </Button>
              </div>
            </div>
          )}
        </div>
      }
      placement="bottom">
      <div
        className={classNames(styles.title, checked && styles.titleActive)}
        onClick={handleTitleClick}>
        <span>{title}</span>
        <CaretDownOutlined
          className={classNames(visible ? styles.rotate : styles.rotateReverse)}
        />
      </div>
    </Popover>
  )
}

export default FilterRadio
