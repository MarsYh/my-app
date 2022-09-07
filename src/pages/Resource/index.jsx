// 投放结案管理
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import imgResource from '../../assets/img/icon-resource.svg'
import styles from './index.module.less'
import { PLATFORM_CONFIG } from './sourceData'
// import { classNames } from 'classNames'

const Manage = () => {
  const navigate = useNavigate()
  const [activekey, setActivekey] = useState('/resource/redbook')
  function handleRoute(route) {
    setActivekey(route)
    navigate(route)
  }
  return (
    <div>
      <div className={styles.resource}>
        <img src={imgResource} alt="" />
      </div>
      <div className={styles.checkbox}>
        {PLATFORM_CONFIG.map((item) => (
          <div
            key={item.value}
            className={activekey === item.route && styles.active}
            onClick={() => handleRoute(item.route)}>
            <img src={item.icon} alt="icon" />
            <span>{item.label}</span>
          </div>
        ))}
        <div className={styles.button}>收录达人</div>
      </div>
      {/* 显示路由容器 */}
      <Outlet />
    </div>
  )
}

export default Manage
