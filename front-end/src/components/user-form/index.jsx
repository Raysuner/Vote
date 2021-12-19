import { memo } from "react"
import { useHistory } from "react-router-dom"

import styled from "styled-components"

import { useInput, useAuth } from "src/utils/hooks"
import { login, register, axiosInstance } from "src/utils/request"

export default memo(function UserForm(props) {
  const history = useHistory()
  const name = useInput()
  const password = useInput()
  const { refetch } = useAuth()
  const { title } = props

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = {
      name: name.value,
      password: password.value
    }
    if (title === "登录") {
      axiosInstance(login(user))
        .then((res) => {
          window.localStorage.setItem("user", JSON.stringify(res.data))
          refetch()
          history.goBack()
        })
        .catch((err) => {
          alert(`登陆失败: ${err}`)
        })
    } else {
      axiosInstance(register(user))
        .then((res) => {
          history.push("/login")
        })
        .catch((err) => {
          alert(`注册失败: ${err?.response.data?.errorMsg}`)
        })
    }
  }


  return (
    <UserFormWrapper>
      <form>
        <div>
          <label>
            用户名:
            <input type="text" {...name} />
          </label>
        </div>
        <div>
          <label>
            密码:
            <input type="password" {...password} />
          </label>
        </div>
        <button onClick={handleSubmit}>{title}</button>
      </form>
    </UserFormWrapper>
  )
})

const UserFormWrapper = styled.div``
