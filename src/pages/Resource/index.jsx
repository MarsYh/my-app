// 投放结案管理
import React, { useState } from 'react'
import { Button } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import imgResource from '@/assets/img/icon-resource.svg'
import styles from './index.module.less'
import { PLATFORM_CONFIG } from './sourceData'
import classNames from 'classnames'

const Manage = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation()


  const [activeKey, setActiveKey] = useState(pathname)

  function handleRoute(route) {
    setActiveKey(route)
    navigate(route)
  }

  return (
    <div>
      <div className={styles.resource}>
        <img src={imgResource} alt="" />
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
        <Button type="primary">收录达人</Button>
      </div>

      {/* 显示路由容器 */}
      <Outlet />
    </div>
  )
}
export default Manage
