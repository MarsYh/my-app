// 小红书界面搜索管理
import React from 'react'
import styles from './index.module.less'
const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.searchInput}>
        <div>
          综合
          <input type="" />
        </div>
        <div>品牌</div>
      </div>
      <div className={styles.expand}>展开</div>
    </div>
  )
}

export default Search
