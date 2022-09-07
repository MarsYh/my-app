// 小红书界面管理
import React from 'react'
import styles from './index.module.less'
import List from './List'
import Head from './Head'
import Search from './Search'
const Redbook = () => {
  return (
    <div className={styles.container}>
      <Head />
      <Search />
      <List />
    </div>
  )
}

export default Redbook
