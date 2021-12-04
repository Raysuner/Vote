import { memo } from "react"

import { useUser } from "./hooks"
import RequireLogin from "../pages/require-login"

export default function WithCheckLogin(Comp) {
  function CheckLogin(props) {
    const { loading, error, user } = useUser()
    if (loading) {
      return null
    }
    if (error) {
      return <RequireLogin></RequireLogin>
    }
    if (user) {
      return <Comp {...props} user={user}></Comp>
    }
  }

  CheckLogin.displayName = "WithRequireLogin" + (Comp.displayName || Comp.name)
  return memo(CheckLogin)
}
