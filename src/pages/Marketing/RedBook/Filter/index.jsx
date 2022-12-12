import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import SearchType from './SearchType'
import WorkType from './WorkType'
import LaunchIndustry from './LaunchIndustry'
import PublicTime from './PublicTime'
import AdvancedFilter from './AdvancedFilter'
import Sort from './Sort'
import { Divider, message } from 'antd'
// import { reqXhsBrandPage } from '@/api/marketing'
// import { useXhsContentSearch } from '@/store/xhsContentSearch'
import { useXhsSelected } from '@/store/xhsContentSelected'

function Filter() {
  // const { tableParams } = useXhsContentSearch()
  const [selectedRecord, setSelectedRecord] = useState({})
  const [selected, dispatchSelected] = useXhsSelected()

  // useEffect(() => {
  //   reqXhsBrandPage().then((res) => {
  //     const { success, msg, data } = res
  //     if (success && data) {
  //     } else {
  //       message.error(msg || '筛选数据请求失败')
  //     }
  //   })
  // }, [])
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <SearchType
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
        <Divider dashed className={styles.divider} />
        <WorkType
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
        <LaunchIndustry
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
        <PublicTime
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
        />
        <AdvancedFilter />
        {/* 筛选条件 */}
        {Object.keys(selected).map((key) => selected[key])}
        <Divider dashed className={styles.divider} />
        <Sort />

        {/* 筛选条件 */}
        <FilterRow title="已选条件">
          {Object.keys(selected).map((key) => selected[key])}
        </FilterRow>
      </div>
    </div>
  )
}
export default Filter
