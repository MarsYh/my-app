// 小红书界面头部管理
import React from 'react'
import styles from './index.module.less'
const Head = () => {
  return (
    <div className={styles.head}>
      <div className={styles.trangle}></div>
      <button>品牌传播</button>
      <button>电商带货</button>
    </div>
  )
}

export default Head
