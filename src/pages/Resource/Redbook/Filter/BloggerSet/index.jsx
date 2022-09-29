// 博主人设
import React from 'react'
import { Space } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import FilterRow from '../../../components/FilterRow'
import { BLOGGER_SET_CONFIG } from './sourceData'
function BloggerSet() {
  return (
    <FilterRow title="博主人设">
      {BLOGGER_SET_CONFIG.map((item) => (
        <Space key={item.value}>
          <div className={styles.item}>
            <div>{item.label}</div>
            <CaretDownOutlined />
          </div>
        </Space>
      ))}
    </FilterRow>
  )
}
export default BloggerSet
