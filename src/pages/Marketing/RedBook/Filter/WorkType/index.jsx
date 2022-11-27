// 搜索维度
import React from 'react'
import { Checkbox, Tooltip } from 'antd'
import styles from './index.module.less'
import FilterRow from '../../../components/FilterRow'
import IconOfficial from '../../List/img/icon-official.png'
function SearchType() {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }
  return (
    <FilterRow title="作品类型">
      <Checkbox onChange={onChange}>
        <img src={IconOfficial} alt="" />
        <span>官方报备作品</span>
      </Checkbox>
      <Tooltip title="即将开放，敬请期待！" overlayClassName={styles.toolTip}>
        <Checkbox onChange={onChange} disabled>
          非官方种草作品
        </Checkbox>
      </Tooltip>
      <Tooltip title="即将开放，敬请期待！" overlayClassName={styles.toolTip}>
        <Checkbox onChange={onChange} disabled>
          @日常种草作品
        </Checkbox>
      </Tooltip>
    </FilterRow>
  )
}
export default SearchType
