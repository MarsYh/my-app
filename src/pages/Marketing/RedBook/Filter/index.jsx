import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import SearchType from './SearchType'
import WorkType from './WorkType'
import LaunchIndustry from './LaunchIndustry'
import PublicTime from './PublicTime'
import AdvancedFilter from './AdvancedFilter'
import { Divider, message } from 'antd'
// import { reqXhsBrandPage } from '@/api/marketing'
// import { useXhsContentSearch } from '@/store/xhsContentSearch'

function Filter() {
  // const { tableParams } = useXhsContentSearch()
  const [selectedRecord, setSelectedRecord] = useState({})
  // const [dataSource, setDataSource] = useState({})
  // const sortFiled = tableParams.sortFiled

  // useEffect(() => {
  //   reqXhsBrandPage().then((res) => {
  //     const { success, msg, data } = res
  //     if (success && data) {
  //       setDataSource(data)
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
        <Divider dashed className={styles.divider} />

        {/* ？ sort组件 */}
        {/* 筛选条件 */}
      </div>
    </div>
  )
}
export default Filter
