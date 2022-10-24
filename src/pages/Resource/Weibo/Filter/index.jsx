import React from 'react'
import styles from './index.module.less'
import SearchType from './SearchType'
import Condition from './Condition'
import History from './History'
import ContentTag from './ContentTag'

function Filter() {
  return (
    <div className={styles.container}>
      <div className={styles.search}></div>
      <div className={styles.content}>
        <SearchType />
        <History />
        <ContentTag />
        {/* 筛选条件 */}
        <Condition />
      </div>
    </div>
  )
}
export default Filter
