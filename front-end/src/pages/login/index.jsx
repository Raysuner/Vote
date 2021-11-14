import { memo } from 'react'

import UserForm from "src/components/user-form"

export default memo(function Login() {
  return (
    <UserForm title="登录"></UserForm>
  )
})
