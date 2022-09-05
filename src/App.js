import './App.css';
import routes from "./routes"
import { useRoutes } from "react-router-dom";

function App() {

  const element = useRoutes(routes)

  return (
    <div className="App">
        {element}
    </div>
  );
}

export default App;
