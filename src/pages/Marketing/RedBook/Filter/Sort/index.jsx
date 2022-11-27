import React from 'react'
import FilterRow from '../../../components/FilterRow'
import { Tag } from 'antd'
import styles from './index.module.less'
import { SORT_CONFIG } from '../sourceData'

function Sort() {
  const { CheckableTag } = Tag
  return (
    <FilterRow
      title={
        <>
          <span className={styles.item}>排</span>序
        </>
      }>
      <div className={styles.content}>
        {SORT_CONFIG.map((item) => (
          <CheckableTag defaultChecked key={item.value}>
            {item.label}
          </CheckableTag>
        ))}
      </div>
    </FilterRow>
  )
}

export default Sort
