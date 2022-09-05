import { Layout, Menu } from "antd";
import React from "react";
import styels from "./index.module.less";
import { Outlet, Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <MailOutlined />,
    children: [],
    label: <Link to="/manage">投放结案管理</Link>,
  },
  {
    key: "2",
    icon: <MailOutlined />,
    children: [],
    label: <Link to="/resource">投前资源库</Link>,
  },
  {
    key: "3",
    icon: <MailOutlined />,
    children: [],
    label: <Link to="/task">任务中心</Link>,
  },
  {
    key: "4",
    icon: <MailOutlined />,
    children: [],
    label: <Link to="/user">个人中心</Link>,
  },
];

function LayoutPro() {
  return (
    <div className={styels.box}>
      <Layout>
        <Header>header</Header>
        <Content>
          <Layout>
            <Sider>
              <Menu
                items={items}
              />
            </Sider>
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Content>
        <Footer>footer</Footer>
      </Layout>
    </div>
  );
}

export default LayoutPro;
