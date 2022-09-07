// 投放结案管理
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import imgResource from '../../assets/img/icon-resource.svg'
import styles from './index.module.less'
import { PLATFORM_CONFIG } from './sourceData'
import classNames from 'classnames'

const Manage = () => {
  const navigate = useNavigate()

  const [activeKey, setActiveKey] = useState('/resource/tiktok')

  function handleRoute(route) {
    setActiveKey(route)
    navigate(route)
  }

  return (
    <div>
      <div className={styles.resource}>
        <img className="resource" src={imgResource} alt="" />
      </div>
      <div className={styles.checkBox}>
        {PLATFORM_CONFIG.map((item) => (
          <div
            key={item.value}
            className={classNames(
              activeKey === item.route && styles.active,
              styles.box
            )}
            onClick={() => handleRoute(item.route)}>
            <img src={item.icon} alt="icon" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* 显示路由容器 */}
      <Outlet />
    </div>
  )
}
export default Manage
