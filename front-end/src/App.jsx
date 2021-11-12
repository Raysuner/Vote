import { HashRouter } from "react-router-dom"
import { renderRoutes } from "react-router-config"

import { routes } from "./router";

function App() {
  return (
    <HashRouter>
      <div className="App">
        {renderRoutes(routes)}
      </div>
    </HashRouter>
  );
}

export default App;
