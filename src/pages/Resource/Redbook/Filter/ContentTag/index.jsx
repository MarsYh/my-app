// 内容标签
import React from 'react'
import { Popover, Tag } from 'antd'
import styles from './index.module.less'
import FilterRow from '../components/FilterRow'
import { CONTENT_TAG_CONFIG } from './sourceData'

function ContentTag() {
  const { CheckableTag } = Tag
  return (
    <FilterRow title="内容标签">
      {CONTENT_TAG_CONFIG.map((item) => (
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
export default ContentTag
