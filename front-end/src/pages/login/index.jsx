import { memo, useEffect } from "react"
import { useHistory } from "react-router"

import UserForm from "src/components/user-form"
import { useAuth } from "src/utils/hooks"

export default memo(function Login() {
  const history = useHistory()
  const { user } = useAuth()
  useEffect(() => {
    if (user) {
      history.goBack()
    }
  })
  return <UserForm title="登录"></UserForm>
})
