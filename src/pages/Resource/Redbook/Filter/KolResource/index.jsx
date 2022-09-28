// 达人来源
import { Radio } from 'antd'
import React from 'react'
import styles from './index.module.less'
import FilterRow from '../components/FilterRow'
import { useXhsResource } from '@/store/xhsResource'
function KolResource(props) {
  // 从父组件里得到筛选列表函数信息
  const { onSetSelectedList } = props
  const { tableParams, dispatch } = useXhsResource()

  function onSourceChange(e) {
    const o = { ...tableParams }
    o.sourceFrom = e.target.value
    dispatch(o)
    // 回显筛选条件
    const selected = {
      title: '达人来源',
      label: o.sourceFrom,
      key: 'sourceFrom',
    }
    onSetSelectedList(selected)
  }
  return (
    <FilterRow title="达人来源">
      <div className={styles.content}>
        <Radio.Group onChange={onSourceChange}>
          <Radio value={0}>全部</Radio>
          <Radio value={1}>蒲公英达人</Radio>
          <Radio value={2}>非蒲公英达人</Radio>
        </Radio.Group>
      </div>
    </FilterRow>
  )
}
export default KolResource
