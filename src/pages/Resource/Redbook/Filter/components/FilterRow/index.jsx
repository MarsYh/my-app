// 筛选行组件
import React from 'react'
import styles from './index.module.less'
function FilterRow(props) {
  const { children, title } = props
  return (
    <div className={styles.box}>
      <div className={styles.title}>{title}</div>
      <div>{children}</div>
    </div>
  )
}
export default FilterRow
