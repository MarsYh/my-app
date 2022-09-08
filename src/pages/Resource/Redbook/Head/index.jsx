import React from 'react'
import { Tabs } from 'antd'
import styles from './index.module.less'

const onChange = (key) => {
  console.log(key)
}

const Head = () => {
  return (
    <div className={styles.head}>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={[
          {
            label: `品牌传播`,
            key: '1',
          },
          {
            label: `电商带货`,
            key: '2',
          },
        ]}
      />
    </div>
  )
}

export default Head
