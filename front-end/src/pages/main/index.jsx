import { memo } from "react"
import { NavLink } from "react-router-dom"
import { renderRoutes } from "react-router-config"

import styled from "styled-components"

export default memo(function Main({ route }) {
  return (
    <MainWrapper className="main">
      {renderRoutes(route.routes)}
      <div className="menu">
        <NavLink to="/main/new">新建</NavLink>
        <NavLink to="/main/mine">我的</NavLink>
      </div>
    </MainWrapper>
  )
})

const MainWrapper = styled.div`
  margin: 0 auto;
  background-color: #f4f5f9;
  .menu {
    text-align: center;
    a {
      margin: 0 10px;
    }
  }
`
