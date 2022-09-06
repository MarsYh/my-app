import Manage from "../pages/Manage";
import Resource from "../pages/Resource";
import Task from "../pages/Task";
import User from "../pages/User";
import LayoutPro from "../components/Layout";
import NotFound from "../pages/NotFound";
import Redbook from "../pages/Resource/Redbook";
import TikTok from "../pages/Resource/Tiktok";
import { Navigate } from "react-router-dom"

const routes = [
  {
    path: "/",
    element: <LayoutPro />,
    exact: true,
    children: [
      {
        path: "manage",
        element: <Manage />,
      },
      {
        path: "resource",
        element: <Resource />,
        children: [
          {
            path: "tiktok",
            element: <TikTok />,
          },
          {
            path: "redbook",
            element: <Redbook />,
          },
          {
            path: "",
            element:<Navigate to={"/resource/tiktok"} />
          }
        ],
      },
      { path: "task", element: <Task /> },
      { path: "user", element: <User /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
