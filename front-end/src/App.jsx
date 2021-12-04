import { HashRouter } from "react-router-dom"
import { renderRoutes } from "react-router-config"

import { routes } from "./router"

import LoginContext from "./components/login-context"

function App() {
  return (
    <HashRouter>
      <LoginContext>
        <div className="App">{renderRoutes(routes)}</div>
      </LoginContext>
    </HashRouter>
  )
}

export default App
