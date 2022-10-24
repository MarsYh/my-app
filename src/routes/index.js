import Manage from "../pages/Manage"
import Resource from "../pages/Resource"
import Task from "../pages/Task"
import User from "../pages/User"
import LayoutPro from "../components/Layout"
import NotFound from "../pages/NotFound"
import Redbook from "../pages/Resource/Redbook"
import Tiktok from "../pages/Resource/Tiktok"
import Weibo from "../pages/Resource/Weibo"
import Wechat from "../pages/Resource/Wechat"
import BiliBili from "../pages/Resource/Bilibili"
import { Navigate } from "react-router-dom"
import RedbookDetail from "../pages/ResourceDetail/Redbook"
import ResourceDetail from "../pages/ResourceDetail"
import TaskContent from "../pages/Task/TaskContent"
import TaskManage from "../pages/Task/TaskManage"
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
} from "@ant-design/icons"
import { lazy } from "react"

const routes = [
  {
    path: "/",
    element: <LayoutPro />,
    exact: true,
    children: [
      {
        path: "manage",
        name: "投放结案管理",
        icon: <UploadOutlined />,
        element: lazy(() => import("../pages/Manage")),
      },
      {
        path: "resource",
        element: <Resource />,
        icon: <MailOutlined />,
        name: "投前资源库",
        children: [
          {
            path: "tiktok",
            element: <Tiktok />,
          },
          {
            path: "redbook",
            element: <Redbook />,
          },
          {
            path: "weibo",
            element: <Weibo />,
          },
          {
            path: "wechat",
            element: <Wechat />,
          },
          {
            path: "bilibili",
            element: <BiliBili />,
          },
          {
            path: "",
            element: <Navigate to={"/resource/tiktok"} />,
          },
        ],
      },
      {
        path: "resourceDetail",
        layout: false,
        element: <ResourceDetail />,
        children: [
          {
            path: "redbookDetail/:id",
            element: <RedbookDetail />,
          },
        ],
      },

      {
        path: "task",
        element: <Task />,
        name: "任务中心",
        exact: true,
        icon: <VideoCameraOutlined />,
        children: [
          {
            path: "taskManage",
            element: <TaskManage />,
            icon: <VideoCameraOutlined />,
          },
          {
            path: "taskContent",
            element: <TaskContent />,
            icon: <VideoCameraOutlined />,
          },
        ],
      },
      {
        path: "user",
        element: <User />,
        name: "个人中心",
        icon: <UserOutlined />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]

export default routes
