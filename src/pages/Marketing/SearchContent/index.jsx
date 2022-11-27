import React from 'react'
import IconBg from './img/bg-work-short.svg'
import styles from './index.module.less'
import { Tabs } from 'antd'
import { SEARCH_CONTENT_HEAD_CONFIG } from '../sourceData'

function SearchContent() {
  return (
    <div className={styles.container}>
      <img src={IconBg} alt="" className={styles.bgImg} />
      <div className={styles.filterContent}>
        <Tabs
          className={styles.tabGroup}
          items={SEARCH_CONTENT_HEAD_CONFIG}
          defaultActiveKey="redbook"
        />
      </div>
      <div className={styles.content}></div>
    </div>
  )
}

export default SearchContent
