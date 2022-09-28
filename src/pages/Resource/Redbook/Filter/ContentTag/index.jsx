// 内容标签
import React from 'react'
import { Popover, Tag } from 'antd'
import styles from './index.module.less'
import FilterRow from '../components/FilterRow'
import { CONTENT_TAG_CONFIG } from './sourceData'
import { useXhsResource } from '@/store/xhsResource'

function ContentTag(props) {
  // 从父组件里得到筛选列表选中信息
  const { onSetSelectedList } = props
  const { dispatch, tableParams } = useXhsResource()

  function handleTagClick(value) {
    const o = { ...tableParams }
  }
  const { CheckableTag } = Tag
  return (
    <FilterRow title="内容标签">
      {CONTENT_TAG_CONFIG.map((item) => (
        <Popover
          key={item.value}
          content={123}
          trigger="hover"
          placement="bottom">
          <CheckableTag onClick={handleTagClick} className={styles.tag}>
            {item.label}
          </CheckableTag>
        </Popover>
      ))}
    </FilterRow>
  )
}
export default ContentTag
