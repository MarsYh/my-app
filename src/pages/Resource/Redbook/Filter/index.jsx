import React, { useState } from 'react'
import styles from './index.module.less'
import SearchType from './SearchType'
import KolResource from './KolResource'
import Condition from './Condition'
import History from './History'
import ContentTag from './ContentTag'
import BloggerInfo from './BloggerInfo'

function Filter() {
  const [selectedList, setSelectedList] = useState([])

  function onSetSelectedList(selected) {
    const _selectedList = [...selectedList]
    _selectedList.push(selected)
    setSelectedList(_selectedList)
  }

  return (
    <div className={styles.container}>
      <div className={styles.search}></div>
      <div className={styles.content}>
        <SearchType />
        <KolResource onSetSelectedList={onSetSelectedList} />
        <History />
        <ContentTag />
        <BloggerInfo />
        {/* 筛选条件 */}
        <Condition selectedList={selectedList} />
      </div>
    </div>
  )
}
export default Filter
