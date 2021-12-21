import { Redirect } from "react-router-dom";

import Main from "../pages/main";
import New from "../pages/new";
import Mine from "../pages/mine";
import Login from "../pages/login";
import Register from "../pages/register";
import Create from "../pages/create";
import Vote from "../pages/vote";

export const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/main/new" />,
  },
  {
    path: "/main",
    component: Main,
    routes: [
      {
        path: "/main",
        exact: true,
        render: () => <Redirect to="/main/new" />,
      },
      {
        path: "/main/new",
        component: New,
      },
      {
        path: "/main/mine",
        component: Mine,
      },
    ],
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/create",
    component: Create,
  },
  {
    path: "/vote/:id",
    component: Vote,
  },
];
