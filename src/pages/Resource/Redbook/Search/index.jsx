import { Button, Input, Radio } from 'antd'
import React, { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { SEARCH_TYPE_CONFIG } from './sourceData'

const SearchPro = () => {
  const [value, setValue] = useState(SEARCH_TYPE_CONFIG[0].value)
  const onChange = ({ target: { value } }) => {
    setValue(value)
  }
  return (
    <div className={styles.searchInput}>
      <div className={styles.tab}>
        <Radio.Group
          options={SEARCH_TYPE_CONFIG}
          onChange={onChange}
          value={value}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div className={styles.input}>
        <Input
          style={{ width: '500px' }}
          placeholder="请输入达人名称或达人ID进行搜索"
          suffix={
            <Button type="primary">
              <SearchOutlined />
            </Button>
          }
        />
      </div>
    </div>
  )
}

export default SearchPro
