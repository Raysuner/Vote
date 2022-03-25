import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import { routes } from "./router";

import AuthProvider from "./components/auth-provider";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <div className="App">{renderRoutes(routes)}</div>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
