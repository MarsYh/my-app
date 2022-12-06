import React, { useState } from 'react'
import { Tag, DatePicker } from 'antd'
import dayjs from 'dayjs'
import styles from './index.module.less'
import FilterRow from '../../../components/FilterRow'
import { PUBLIC_TIME_CONFIG } from '../sourceData'

function PublicTime() {
  const { CheckableTag } = Tag
  const { RangePicker } = DatePicker
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1])
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    } else {
      console.log('Clear')
    }
  }
  const rangePresets = [
    {
      label: 'Last 7 Days',
      value: [dayjs().add(-7, 'd'), dayjs()],
    },
    {
      label: 'Last 14 Days',
      value: [dayjs().add(-14, 'd'), dayjs()],
    },
    {
      label: 'Last 30 Days',
      value: [dayjs().add(-30, 'd'), dayjs()],
    },
    {
      label: 'Last 90 Days',
      value: [dayjs().add(-90, 'd'), dayjs()],
    },
  ]

  return (
    <FilterRow title="发布时间">
      <div className={styles.content}>
        {PUBLIC_TIME_CONFIG.map((item) => (
          <CheckableTag key={item.value}>{item.label}</CheckableTag>
        ))}
        <RangePicker presets={rangePresets} onChange={onRangeChange} />
      </div>
    </FilterRow>
  )
}

export default PublicTime
