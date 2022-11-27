import React from 'react'
import { Tag } from 'antd'
import styles from './index.module.less'
import FilterRow from '../../../components/FilterRow'
import { PUBLIC_TIME_CONFIG } from '../sourceData'

function PublicTime() {
  const { CheckableTag } = Tag
  return (
    <FilterRow title="发布时间">
      <div className={styles.content}>
        {PUBLIC_TIME_CONFIG.map((item) => (
          <CheckableTag defaultChecked key={item.value}>
            {item.label}
          </CheckableTag>
        ))}
      </div>
    </FilterRow>
  )
}

export default PublicTime
