import { memo } from "react"
import { NavLink } from "react-router-dom"

export default memo(function RequireLogin() {
  return (
    <div>
      <NavLink to="/login">登录</NavLink>
    </div>
  )
})
