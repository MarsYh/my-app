import React from 'react'
import styles from './index.module.less'
import { Button } from 'antd'

function HistoryTag() {
  return (
    <div className={styles.historyTag}>
      <Button>历史投放</Button>
    </div>
  )
}

export default HistoryTag
