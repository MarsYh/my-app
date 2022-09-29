// 搜索维度
import { Radio } from 'antd'
import React from 'react'
import styles from './index.module.less'
import FilterRow from '../../../components/FilterRow'
function SearchType() {
  return (
    <FilterRow title="搜索维度">
      <div className={styles.content}>
        <Radio.Group>
          <Radio>名称或Id</Radio>
          <Radio>MCN</Radio>
        </Radio.Group>
      </div>
    </FilterRow>
  )
}
export default SearchType
