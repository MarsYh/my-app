import { Input } from 'antd'
import { Radio } from 'antd'
import React, { useState } from 'react'
import styles from './index.module.less'

const optionsWithDisabled = [
  {
    label: '综合',
    value: '1',
  },
  {
    label: '品牌',
    value: '2',
  },
]
const { Search } = Input

const SearchPro = () => {
  const [value, setValue4] = useState()
  const onChange = ({ target: { value } }) => {
    setValue4(value)
  }
  return (
    <div className={styles.searchInput}>
      <div className={styles.tab}>
        <Radio.Group
          defaultValue={1}
          options={optionsWithDisabled}
          onChange={onChange}
          value={value}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div className={styles.input}>
        <Search
          placeholder="请输入达人名称或达人ID进行搜索"
          // onSearch={onSearch}
          enterButton
        />
      </div>
    </div>
  )
}

export default SearchPro
