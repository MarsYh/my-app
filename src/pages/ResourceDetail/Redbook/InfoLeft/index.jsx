import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.less'
import IconXHS from './img/icon-official-xiaohongshu.svg'
// import { Divider } from 'antd'
import { BTNS_CONFIG } from './sourceData'
import classNames from 'classnames'
import context from '../context'

const { Provider } = context

const InfoLeft = () => {
  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  // console.log('search:', search)
  // 当前选中的按钮选项
  const [checked, setChecked] = useState(getInitChecked())
  // console.log(checked)
  // console.log(checked)
  // 获取初始化的checked选项
  function getInitChecked() {
    const paramsList = search.split('&')
    // console.log(paramsList)
    const params = paramsList.find((params) => params.includes('type='))
    // console.log('params', params)
    if (!params) {
      return BTNS_CONFIG[0].value
    } else {
      const str = params.split('type=').pop()
      // console.log(str)
      return str
    }
  }
  // 修改checked的值的方法
  function dispatch(item) {
    // 改变当前选中的checked的值
    setChecked(item.value)
    // 修改地址栏的值、参数值
    // 因为会修改复用newSearch变量的值 所以用let
    let newSearch =
      search
        .split('&')
        .filter((params) => !params.includes('type='))
        .join('&') + `&type=${item.value}`
    if (!newSearch.includes('?')) {
      newSearch = `?${newSearch}`
    }
    const href = `${pathname}${newSearch}`
    navigate(href)
  }

  return (
    <Provider value={{ checked, dispatch }}>
      <div className={styles.infoLeft}>
        <div className={styles.title}>
          <img src={IconXHS} alt="" />
          <span>小红书详情</span>
        </div>
        <div className={styles.btnGroup}>
          {BTNS_CONFIG.map((item) => (
            <div
              key={item.value}
              onClick={() => dispatch(item)}
              className={classNames(
                styles.btn,
                checked === item.value && styles.checked
              )}>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        {/* <Divider>
        <span className={styles.dataInfo}>私有数据</span>
      </Divider>
      <div>历史投放</div> */}
      </div>
    </Provider>
  )
}

export default InfoLeft
