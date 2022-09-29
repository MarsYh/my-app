// 内容特征
import React from 'react'
import { Popover, Tag } from 'antd'
import styles from './index.module.less'
import FilterRow from '../components/FilterRow'
import { CONTENT_FEATURE_CONFIG } from './sourceData'

function ContentFeature() {
  const { CheckableTag } = Tag
  return (
    <FilterRow title="内容特征">
      {CONTENT_FEATURE_CONFIG.map((item) => (
        <Popover
          key={item.value}
          content={123}
          trigger="hover"
          placement="bottom">
          <CheckableTag className={styles.tag}>{item.label}</CheckableTag>
        </Popover>
      ))}
    </FilterRow>
  )
}
export default ContentFeature
