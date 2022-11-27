import React, { useState, useEffect, useRef } from 'react'
import { Checkbox, Divider, Input, Popover, Typography } from 'antd'
import styles from './index.module.less'
import FilterRow from '../../../components/FilterRow'
import classNames from 'classnames'
import {
  LAUNCH_INDUSTRY_CONFIG,
  LAUNCH_INDUSTRY_ITEM_CONFIG,
} from '../sourceData'
import { useDebounce, useSize } from 'ahooks'
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons'

function LaunchIndustry() {
  const [visible, setVisible] = useState(false)
  // 是否被折叠
  const [collapse, setCollapse] = useState(true)
  // 展开/收起 是否显示
  const [isShow, setIsShow] = useState(false)
  const ref = useRef(null)
  const size = useSize(ref) || { size: {} }
  const debouncedValue = useDebounce(size.width, { wait: 500 })
  // 展开或者收起功能
  useEffect(() => {
    if (debouncedValue) {
      setIsShow(ref?.current?.clientHeight > 20)
    }
  }, [debouncedValue, ref])
  function handleCollapse() {
    setCollapse(!collapse)
  }
  return (
    <FilterRow title="投放行业">
      <div ref={ref} className={styles.content}>
        <div className={classNames(collapse && styles.hidden, styles.wrapper)}>
          {LAUNCH_INDUSTRY_CONFIG.map((item) => (
            <Popover
              onVisibleChange={(item) => setVisible(item)}
              trigger="click"
              placement="bottom"
              overlayClassName={styles.popover}
              content={
                <div className={styles.checkBox}>
                  <Input
                    className={styles.input}
                    prefix={<SearchOutlined />}
                    bordered={false}
                  />
                  <Divider className={styles.divider} />
                  <div className={styles.checkGroup}>
                    {LAUNCH_INDUSTRY_ITEM_CONFIG.map((check) => (
                      <div className={styles.check}>
                        <Checkbox key={check.value} value={check.value}>
                          <img className={styles.img} src={check.icon} alt="" />
                          <span>{check.label}</span>
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </div>
              }
              key={item.value}>
              <div className={classNames(styles.item, styles.flex)}>
                <span>{item.label}</span>
                <CaretDownOutlined
                  className={classNames(
                    visible ? styles.rotate : styles.rotateReverse
                  )}
                />
              </div>
            </Popover>
          ))}
          {/* 逻辑控制展开或收起 */}
          {isShow && (
            <Typography.Link
              className={styles.collapse}
              onClick={handleCollapse}>
              {collapse ? '展开' : '收起'}
            </Typography.Link>
          )}
        </div>
      </div>
    </FilterRow>
  )
}

export default LaunchIndustry
