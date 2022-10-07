// 搜索维度
import { Radio } from 'antd'
import React, { useState } from 'react'
import styles from './index.module.less'
import FilterRow from '../../../components/FilterRow'
function SearchType() {
  const [value, setValue] = useState(1)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <FilterRow title="搜索维度">
      <div className={styles.content}>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>名称或Id</Radio>
          <Radio value={2}>MCN</Radio>
        </Radio.Group>
      </div>
    </FilterRow>
  )
}
export default SearchType
