import { memo } from 'react'

import styled from "styled-components"

export default memo(function UserForm({name}) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.currentTarget.elements[0].value
    const password = event.currentTarget.elements[1].value
    console.log(username, password)
    // TODO Login
  }
  return (
    <UserFormWrapper>
      <form onSubmit={handleSubmit}>
        <div><label >用户名：<input type="text"/></label></div>
        <div><label >密码：<input type="password"/></label></div>
        <button type="submit">{name}</button>
      </form>
    </UserFormWrapper>
  )
})

const UserFormWrapper = styled.div``
