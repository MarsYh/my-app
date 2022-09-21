import { Layout, Menu, message } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.less";
import "./layout.less";
import { Outlet, Link, useLocation } from "react-router-dom";
import IconTitle from "../../assets/img/bg-title.svg";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import HeaderRight from "../HeaderRight";
import { getUserInfo } from "@/api";
import routes from "../../routes";
import context from "../../store/global";

const { Header, Content, Sider } = Layout;

const { Provider } = context;

function LayoutPro() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const [visibleSider, setVisibleSider] = useState(true);
  const [items, setItems] = useState([]);
  // 用户的信息
  const [userInfo, setUserInfo] = useState({});

  // 获取菜单配置项
  useEffect(() => {
    const _routes = routes.find((route) => route.path === "/");
    if (!_routes) return [];

    const items = [];
    _routes.children.forEach((child) => {
      filterRoute(items, child);
    });

    items.length && setItems(items);
  }, []);

  function filterRoute(items, route) {
    const { path, name, icon, children } = route;
    if (!name) return;
    const o = {
      key: path,
      icon: icon,
      label: <Link to={"/" + path}>{name}</Link>,
    };
    items.push(o);
    if (!children) return;

    const isName = children.some((child) => child.name);
    if (isName) {
      o.children = [];
      children.forEach((child) => filterRoute(o.children, child));
    }
  }

  useEffect(() => {
    getUserInfo().then((res) => {
      const { success, msg, data } = res;
      if (success && data) {
        setUserInfo(data);
      } else {
        message.error(msg || "获取用户信息失败");
      }
      // 1. 拿到res
      // 2. 将用户信息存储到全局状态里面去
      // if (res.data.value?.code === '000995') {
      //   window.location.href = `http://test.main.newrank.cn/user/login?displayType=login&backUrl=${encodeURIComponent(
      //     window.location.href
      //   )}&source=130&type=121&scene=adinsight_login`
      // }
    });
  }, []);

  useEffect(() => {
    const _routes = routes.find((route) => route.path === "/");
    const queue = [..._routes.children];
    while (queue.length) {
      const route = queue.shift();
      const pathList = pathname.split("/");
      if (pathList.includes(route.path)) {
        // 不需要layout
        if (route.layout === false) {
          visibleSider !== false && setVisibleSider(false);
        } else {
          // 需要layout
          visibleSider !== true && setVisibleSider(true);
        }
        return;
      }
      route.children && queue.push(...route.children);
    }
  }, [pathname]);

  function handleCollapsed() {
    setCollapsed(!collapsed);
  }

  return (
    <Provider value={{ userInfo }}>
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
              {visibleSider && (
                <Sider
                  trigger={null}
                  collapsible
                  collapsed={collapsed}
                  defaultSelectedKeys={pathname}
                  selectedKeys={pathname}
                >
                  <Menu items={items} />
                </Sider>
              )}
              <Content className={styles.container}>
                <Outlet />
              </Content>
            </Layout>
          </Content>
          {/* <Footer>footer</Footer> */}
        </Layout>
      </div>
    </Provider>
  );
}

export default LayoutPro;
