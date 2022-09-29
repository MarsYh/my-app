// 博主信息
import React from 'react'
import { Space } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import FilterRow from '../../../components/FilterRow'
import { BLOGGER_INFO_CONFIG } from './sourceData'
function BloggerInfo() {
  return (
    <FilterRow title="博主信息">
      {BLOGGER_INFO_CONFIG.map((item) => (
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
export default BloggerInfo
