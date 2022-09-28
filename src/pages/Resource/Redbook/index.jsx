// 小红书界面管理
import React, { useState } from 'react'
import List from './List'
import Filter from './Filter'
import { TYPE_CONFIG } from './sourceData'
import context from '@/store/xhsResource'

const Redbook = () => {
  const { Provider } = context
  const [tableParams, setTableParams] = useState({
    type: TYPE_CONFIG[0].value,
    source: 1,
    page: {
      pageSize: 20,
      pageNo: 1,
    },
    contentTags: [],
  })
  return (
    <Provider value={{ tableParams, dispatch: setTableParams }}>
      <Filter />
      <List />
    </Provider>
  )
}

export default Redbook
