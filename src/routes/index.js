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

const routes = [
  {
    path: "/",
    element: <LayoutPro />,
    exact: true,
    children: [
      {
        path: "manage",
        element: <Manage />
      },
      {
        path: "resource", element: <Resource />,
        children: [
          {
            path: "tiktok",
            element: <Tiktok />
          },
          {
            path: "redbook",
            element: <Redbook />
          },
          {
            path: "weibo",
            element: <Weibo />
          },
          {
            path: "wechat",
            element: <Wechat />
          },
          {
            path: "bilibili",
            element: <BiliBili />
          },
          {
            path: "",
            element: <Navigate to={"/resource/tiktok"} />
          },
        ]
      },
      {
        path: 'resourceDetail', element: <ResourceDetail />,
        children: [
          {
            path: "redbookDetail",
            element: <RedbookDetail />
          },
        ]
      },
      { path: "task", element: <Task /> },
      { path: "user", element: <User /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]

export default routes
