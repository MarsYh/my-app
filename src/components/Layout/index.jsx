import { Layout, Menu, Avatar, Image, Space } from 'antd'
import React, { useState } from 'react'
import styles from './index.module.less'
import { Outlet, Link, useLocation } from 'react-router-dom'
import imgTitle from '../../assets/bg-title.svg'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
  BellOutlined,
} from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout

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
  return (
    <div className={styles.box}>
      <Layout>
        <Space>
          <Header>
            <img className="bg" src={imgTitle} alt="" />
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <BellOutlined />
            <span className="profile">
              <Avatar
                src={
                  <Image
                    src="https://joeschmoe.io/api/v1/random"
                    style={{
                      width: 32,
                    }}
                  />
                }
              />
              <span>Users</span>
            </span>
          </Header>
        </Space>
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
            <Content>
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
