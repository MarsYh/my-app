// 多选筛选组件
import React, { useState } from 'react'
import { Checkbox, Popover } from 'antd'
import classNames from 'classnames'
import { CaretDownOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const FilterCheckbox = (props) => {
  const { title, checked, options, onChange } = props
  const [visible, setVisible] = useState(false)

  function onCheckChange(e, cur) {
    const _checked = e.target.checked
    let list = [...checked]
    // 这里的list初始值为[]
    if (_checked) {
      list.push(cur)
    } else {
      list = list.filter((item) => item !== cur)
    }
    onChange(list)
    // 这里的list随着勾选变化值
    // console.log(list)
  }

  function renderContent() {
    return options.map((item) => {
      let label,
        value,
        isChecked = false
      if (typeof item === 'object') {
        if ('label' in item) {
          label = item.label
          value = item.value
          isChecked = checked.find((o) => o.value === item.value)
        }
      } else {
        label = item
        value = item
        isChecked = checked.includes(item)
      }
      return (
        <Checkbox
          key={value}
          checked={isChecked}
          onChange={(e) => onCheckChange(e, item)}>
          {label}
        </Checkbox>
      )
    })
  }

  return (
    <Popover
      onVisibleChange={(v) => setVisible(v)}
      trigger="click"
      placement="bottom"
      overlayClassName={styles.popover}
      content={<div className={styles.content}>{renderContent()}</div>}>
      <div
        className={classNames(
          styles.title,
          checked.length && styles.titleActive
        )}>
        <span>{title}</span>
        <CaretDownOutlined
          className={classNames(visible ? styles.rotate : styles.rotateReverse)}
        />
      </div>
    </Popover>
  )
}

export default FilterCheckbox
