// 小红书界面管理
import React from 'react'
import List from './List'
import Filter from "./Filter"
import context from "@/store/xhsResource"
import { useState } from 'react'
import { TYPE_CONFIG } from "./sourceData"

const { Provider } = context

const Redbook = () => {

  const [tableParams,setTableParams] = useState({
    type: TYPE_CONFIG[0].value,
    source: 1,
    page: {
      pageSize: 20,
      pageNo: 1,
    },
  })

  return (
    <Provider value={{ tableParams,dispatch:setTableParams }}>
      <Filter />
      <List  />
    </Provider>
  )
}

export default Redbook
