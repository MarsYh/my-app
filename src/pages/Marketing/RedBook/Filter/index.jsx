import React from 'react'
import styles from './index.module.less'
import SearchType from './SearchType'
import WorkType from './WorkType'
import LaunchIndustry from './LaunchIndustry'
import PublicTime from './PublicTime'
import AdvancedFilter from './AdvancedFilter'
import { Divider } from 'antd'
import Sort from './Sort'

function Filter() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <SearchType />
        <Divider dashed className={styles.divider} />
        <WorkType />
        <LaunchIndustry />
        <PublicTime />
        <AdvancedFilter />
        <Divider dashed className={styles.divider} />
      </div>
    </div>
  )
}
export default Filter
