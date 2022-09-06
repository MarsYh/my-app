import { Layout, Menu } from 'antd'
import React, { useState } from 'react'
import styles from './index.module.less'
import './layout.less'
import { Outlet, Link, useLocation } from 'react-router-dom'
import IconTitle from '../../assets/img/bg-title.svg'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
} from '@ant-design/icons'
import HeaderRight from '../HeaderRight'

const { Header, Content, Sider } = Layout

const items = [
  {
    key: '1',
    icon: <UploadOutlined />,
    // children: [],
    label: <Link to="/manage">投放结案管理</Link>,
  },
  {
    key: '2',
    icon: <UserOutlined />,
    // children: [],
    label: <Link to="/user">个人中心</Link>,
  },
  {
    key: '3',
    icon: <MailOutlined />,
    // children: [],
    label: <Link to="/resource">投前资源库</Link>,
  },
  {
    key: '4',
    icon: <VideoCameraOutlined />,
    // children: [],
    label: <Link to="/task">任务中心</Link>,
  },
]

function LayoutPro() {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()

  function handleCollapsed() {
    setCollapsed(!collapsed)
  }

  return (
    <div className={styles.box}>
      <Layout>
        <Header className={styles.head}>
          <div className={styles.left}>
            <img src={IconTitle} alt="" />
            <div onClick={handleCollapsed}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </div>
          <HeaderRight />
        </Header>
        <Content>
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              defaultSelectedKeys={pathname}
              selectedKeys={pathname}>
              <Menu items={items} />
            </Sider>
            <Content className={styles.container}>
              <Outlet />
            </Content>
          </Layout>
        </Content>
        {/* <Footer>footer</Footer> */}
      </Layout>
    </div>
  )
}

export default LayoutPro
