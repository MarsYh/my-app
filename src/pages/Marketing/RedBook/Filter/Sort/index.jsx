import React from 'react'
import FilterRow from '../../../components/FilterRow'
import FilterSelected from '../../../components/FilterSelected'
import { Tag } from 'antd'
import styles from './index.module.less'
import { SORT_CONFIG } from '../sourceData'
import { useXhsContentSearch } from '@/store/xhsContentSearch'

function Sort(props) {
  // 从父组件里得到筛选列表函数信息
  const { selectedRecord, setSelectedRecord } = props
  const { tableParams, dispatch } = useXhsContentSearch()
  const { CheckableTag } = Tag
  function del() {
    // 1. 清除条件
    const _record = { ...selectedRecord }
    delete _record.sortFiled
    setSelectedRecord(_record)
    // 2. 同步筛选条件
    const o = { ...tableParams }
    o.sortFiled = SORT_CONFIG[0].value
    dispatch(o)
  }
  function onSortChange(e) {
    // console.log(e)
    const o = { ...tableParams }
    // console.log('O:', o)
    const record = { ...selectedRecord }
    o.sortFiled = e.target.value
    dispatch(o)
    setSelectedRecord(record)
    del()
  }
  return (
    <FilterRow
      title={
        <>
          <span className={styles.item}>排</span>序
        </>
      }>
      <div className={styles.content}>
        {SORT_CONFIG.map((item) => (
          <CheckableTag
            // checked={selectedRecord}
            key={item.value}
            onChange={(e) => onSortChange(e)}>
            {item.label}
          </CheckableTag>
        ))}
      </div>
    </FilterRow>
  )
}

export default Sort
