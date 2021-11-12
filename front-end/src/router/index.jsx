import {Redirect} from "react-router-dom"

import Home from "../pages/home"
import New from "../pages/new"
import Mine from "../pages/mine"
import Login from "../pages/login"
import Register from "../pages/register"
import Create from "../pages/create"

export const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/home/new" />
  },
  {
    path: "/home",
    component: Home,
    routes: [
      {
        path: "/home",
        exact: true,
        render: () => <Redirect to="/home/new" />
      },
      {
        path: "/home/new",
        component: New
      },
      {
        path: "/home/mine",
        component: Mine
      }
    ]
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/create",
    component: Create
  }
]