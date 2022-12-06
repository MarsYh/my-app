import React, { useState } from 'react'
import { Tag, DatePicker } from 'antd'
import dayjs from 'dayjs'
import styles from './index.module.less'
import FilterRow from '../../../components/FilterRow'
import { PUBLIC_TIME_CONFIG } from '../sourceData'
import { useXhsContentSearch } from '@/store/xhsContentSearch'

const { CheckableTag } = Tag
const { RangePicker } = DatePicker
function PublicTime() {
  const { tableParams, dispatch } = useXhsContentSearch()
  const [checked, setChecked] = useState()
  const onRangeChange = (dates, dateStrings) => {
    const o = { ...tableParams }
    const [max, min] = dateStrings
    if (min && max) {
      o.publishTimeMin = min
      o.publishTimeMax = max
    } else {
      delete o.publishTimeMin
      delete o.publishTimeMax
    }
    dispatch(o)
  }
  // const rangePresets = [
  //   {
  //     label: 'Last 7 Days',
  //     value: [dayjs().add(-7, 'd'), dayjs()],
  //   },
  //   {
  //     label: 'Last 14 Days',
  //     value: [dayjs().add(-14, 'd'), dayjs()],
  //   },
  //   {
  //     label: 'Last 30 Days',
  //     value: [dayjs().add(-30, 'd'), dayjs()],
  //   },
  //   {
  //     label: 'Last 90 Days',
  //     value: [dayjs().add(-90, 'd'), dayjs()],
  //   },
  // ]
  function handleTimeChecked(checkedValue) {
    if (checked === checkedValue) return
    setChecked(checkedValue)
    if (checked === 'user_defined') {
      console.log('用户自定义')
      return
    }
    const d = dayjs()
    const maxTime = d.format('YYYY-MM-DD')
    const minTime = d.add(checkedValue, 'day').format('YYYY-MM-DD')
    const o = { ...tableParams }
    o.publishTimeMin = minTime
    o.publishTimeMax = maxTime
    dispatch(o)
  }

  return (
    <FilterRow title="发布时间">
      <div className={styles.content}>
        {PUBLIC_TIME_CONFIG.map((item) => (
          <CheckableTag
            key={item.value}
            checked={checked === item.value}
            onClick={() => handleTimeChecked(item.value)}>
            {item.label}
          </CheckableTag>
        ))}
        {checked === 'user_defined' && (
          <RangePicker
            //  presets={rangePresets}
            onChange={onRangeChange}
          />
        )}
      </div>
    </FilterRow>
  )
}

export default PublicTime
