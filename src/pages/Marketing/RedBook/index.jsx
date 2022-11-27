import React, { useState } from 'react'
import styles from './index.module.less'
import { SEARCH_CONTENT_CONFIG, REDBOOK_TYPE_CONFIG } from '../sourceData'
import classNames from 'classnames'
import { Button, Divider, Input, Space } from 'antd'
import Filter from './Filter'
import List from './List'
import DetailDraw from './DetailDraw'
import Sort from './Filter/Sort'

function RedBook() {
  const [switchKey, setSwitchKey] = useState('list')
  const [activeKey, setActiveKey] = useState('1')

  function handleClick(type) {
    if (activeKey === type) return
    setActiveKey(type)
  }

  function handleTypeClick(type) {
    if (switchKey === type) return
    setSwitchKey(type)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <div className={styles.searchBox}>
          <div className={styles.top}>
            {SEARCH_CONTENT_CONFIG.map((item) => (
              <div
                key={item.value}
                className={classNames(
                  styles.item,
                  activeKey === item.value && styles.checked
                )}
                onClick={() => handleClick(item.value)}>
                <img src={item.icon} alt="" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              <Input
                placeholder="关键词搜索：护肤，化妆品，隔离（多个关键词用逗号隔开）"
                maxLength="50"
              />
              <Button type="primary">搜索</Button>
            </div>
            <div className={styles.right}>
              <div className={styles.controlBtn}>
                <Space size={6}>
                  <span>展开</span>
                  <span className={styles.downArrow}></span>
                </Space>
              </div>
            </div>
          </div>
        </div>
        <Filter />
        <div className={styles.tableView}>
          <Sort />
          {REDBOOK_TYPE_CONFIG.map((item) => (
            <Button
              type="primary"
              className={switchKey === item.value && styles.hide}
              onClick={() => handleTypeClick(item.value)}>
              <img src={item.icon} alt="" />
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
      {switchKey === 'big' ? <DetailDraw /> : <List />}
    </div>
  )
}

export default RedBook
