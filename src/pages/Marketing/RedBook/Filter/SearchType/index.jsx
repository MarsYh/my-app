// 搜索维度
import React from 'react'
import { Checkbox } from 'antd'
import styles from './index.module.less'
import FilterRow from '../../../components/FilterRow'
import { SEARCH_TYPE_CONFIG } from '../sourceData'
function SearchType() {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }
  return (
    <FilterRow title="搜索维度">
      {SEARCH_TYPE_CONFIG.map((item) => (
        <Checkbox onChange={onChange} key={item.value}>
          {item.label}
        </Checkbox>
      ))}
      {/* <Checkbox onChange={onChange}>正文</Checkbox>
      <Checkbox onChange={onChange}>@用户</Checkbox>
      <Checkbox onChange={onChange}>作品标签</Checkbox> */}
    </FilterRow>
  )
}
export default SearchType
