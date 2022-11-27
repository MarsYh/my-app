import { Tag } from 'antd'
import React from 'react'
import FilterRow from '../../../../../components/FilterRow'
import {
  CPM_CONFIG,
  CPE_CONFIG,
  READ_MEDIA_CONFIG,
  INTERACT_MEDIA_CONFIG,
  INTERACT_RATE_CONFIG,
  VIDEO_RATE_CONFIG,
} from '../../../sourceData'
import styles from './index.module.less'

function Performance() {
  const { CheckableTag } = Tag
  return (
    <div>
      <FilterRow title="预期CPM">
        <div className={styles.content}>
          {CPM_CONFIG.map((item) => (
            <CheckableTag key={item.value}>{item.label}</CheckableTag>
          ))}
          <CheckableTag>自定义</CheckableTag>
        </div>
      </FilterRow>
      <FilterRow title="预期CPE">
        <div className={styles.content}>
          {CPE_CONFIG.map((item) => (
            <CheckableTag key={item.value}>{item.label}</CheckableTag>
          ))}
          <CheckableTag>自定义</CheckableTag>
        </div>
      </FilterRow>
      <FilterRow title="阅读中位数">
        <div className={styles.content}>
          {READ_MEDIA_CONFIG.map((item) => (
            <CheckableTag key={item.value}>{item.label}</CheckableTag>
          ))}
          <CheckableTag>自定义</CheckableTag>
        </div>
      </FilterRow>
      <FilterRow title="互动中位数">
        <div className={styles.content}>
          {INTERACT_MEDIA_CONFIG.map((item) => (
            <CheckableTag key={item.value}>{item.label}</CheckableTag>
          ))}
          <CheckableTag>自定义</CheckableTag>
        </div>
      </FilterRow>
      <FilterRow title="互动率">
        <div className={styles.content}>
          {INTERACT_RATE_CONFIG.map((item) => (
            <CheckableTag key={item.value}>{item.label}</CheckableTag>
          ))}
          <CheckableTag>自定义</CheckableTag>
        </div>
      </FilterRow>
      <FilterRow title="视频完播率">
        <div className={styles.content}>
          {VIDEO_RATE_CONFIG.map((item) => (
            <CheckableTag key={item.value}>{item.label}</CheckableTag>
          ))}
          <CheckableTag>自定义</CheckableTag>
        </div>
      </FilterRow>
    </div>
  )
}

export default Performance
