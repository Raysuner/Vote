import { memo } from "react"

import Login from "../pages/login"
import { useAuth } from "./hooks"

export default function withAuth(Comp) {
  function Auth(props) {
    const { loading, error, user } = useAuth()
    if (loading) {
      return null
    }
    if (error) {
      return <Login></Login>
    }
    if (user) {
      return <Comp {...props} user={user}></Comp>
    }
  }

  Auth.displayName = "WithAuth" + (Comp.displayName || Comp.name)
  return memo(Auth)
}
