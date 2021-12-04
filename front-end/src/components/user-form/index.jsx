import { memo, useCallback, useRef } from "react"
import { useHistory } from "react-router-dom"

import styled from "styled-components"

import { useInput, useUser } from "src/utils/hooks"
import { login, register } from "src/utils/request"

export default memo(function UserForm({ title }) {
  const history = useHistory()
  const name = useInput()
  const password = useInput()
  const titleRef = useRef("")
  const { update } = useUser()

  titleRef.current = title

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      const user = {
        name: name.value,
        password: password.value
      }
      if (titleRef.current === "登录") {
        login(user)
          .then((res) => {
            window.localStorage.setItem("user", JSON.stringify(res.data))
            update()
            history.goBack()
          })
          .catch((err) => {
            alert(`登陆失败: ${err.response.data?.errorMsg}`)
          })
      } else {
        register(user)
          .then((res) => {
            history.push("/login")
          })
          .catch((err) => {
            alert(`注册失败: ${err.response.data?.errorMsg}`)
          })
      }
    },
    [name.value, password.value, history, update]
  )

  return (
    <UserFormWrapper>
      <form>
        <div>
          <label>
            用户名：
            <input type="text" {...name} />
          </label>
        </div>
        <div>
          <label>
            密码：
            <input type="password" {...password} />
          </label>
        </div>
        <button onClick={handleSubmit}>{title}</button>
      </form>
    </UserFormWrapper>
  )
})

const UserFormWrapper = styled.div``
