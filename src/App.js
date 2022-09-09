import './App.css'
import routes from "./routes"
import { useRoutes } from "react-router-dom"
import "@/assets/css/common.less"

function App () {

  const element = useRoutes(routes)

  return (
    <div className="App">
      {element}
    </div>
  )
}

export default App
