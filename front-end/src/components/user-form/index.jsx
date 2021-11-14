import { memo, useCallback, useRef, useContext } from 'react'
import { useHistory } from "react-router-dom"

import styled from "styled-components"

import { useInput } from "src/utils/hooks"
import { login, register } from "src/utils/request"

export default memo(function UserForm({title}) {
  const history = useHistory()
  const name = useInput()
  const password = useInput()
  const titleRef = useRef("")

  titleRef.current = title

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault()
    const user = {
      name: name.value,
      password: password.value
    }
    try {
      if (titleRef.current === "登录") {
        const res = await login(user)
        if (res) {
          window.localStorage.setItem("user", JSON.stringify(res.data))
          history.push("/home/new")
        } else {
          throw new Error("登录失败")
        }
      } else {
        const res = await register(user)
        if (res) {
          history.push("/login")
        } else {
          throw new Error("注册失败")
        }
      }
    } catch (error) {
      if (error.message === "登录失败") {
        console.error("登陆失败")
      } else {
        console.error("注册失败")
      }
    }
  }, [name.value, password.value, history])

  return (
    <UserFormWrapper>
      <form>
        <div><label >用户名：<input type="text" {...name}/></label></div>
        <div><label >密码：<input type="password" {...password}/></label></div>
        <button onClick={handleSubmit}>{title}</button>
      </form>
    </UserFormWrapper>
  )
})

const UserFormWrapper = styled.div``
