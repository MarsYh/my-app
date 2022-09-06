import Manage from "../pages/Manage"
import Resource from "../pages/Resource"
import Task from "../pages/Task"
import User from "../pages/User"
import LayoutPro from "../components/Layout"
import NotFound from "../pages/NotFound"
import Redbook from "../pages/Redbook"

const routes = [
  {
    path: "/",
    element: <LayoutPro />,
    exact: true,
    children: [
      {
        path: "manage",
        element: <Manage />,
        children: [
          {
            path: "redbook",
            element: <Redbook />
          }
        ]
      },
      { path: "resource", element: <Resource /> },
      { path: "task", element: <Task /> },
      { path: "user", element: <User /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]

export default routes