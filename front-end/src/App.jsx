import { HashRouter } from "react-router-dom"
import { renderRoutes } from "react-router-config"

import { routes } from "./router";
import { LoginContext } from "./common/context/context"

function App() {
  return (
    <HashRouter>
      {/* <LoginContext.Provider value={{ isLogin: false }}> */}
        <div className="App">
          {renderRoutes(routes)}
        </div>
      {/* </LoginContext.Provider> */}
    </HashRouter>
  );
}

export default App;
