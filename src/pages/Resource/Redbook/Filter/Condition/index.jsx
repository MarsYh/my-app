// 当前的筛选条件
import React from 'react'
import { Tag } from 'antd'
import { UndoOutlined } from '@ant-design/icons'
import FilterRow from '../../../components/FilterRow'
import styles from './index.module.less'

const Condition = (props) => {
  const { selectedRecord } = props

  const keys = Object.keys(selectedRecord)

  return (
    <FilterRow title="已选条件">
      {/* 当前的筛选内容 */}
      <div className={styles.filter}>
        {keys.map((key) => (
          <div className={styles.tags}>{selectedRecord[key]}</div>
        ))}
        <div className={styles.clearBtn}>
          <UndoOutlined />
          重置所有筛选
        </div>
      </div>
    </FilterRow>
  )
}

export default Condition
