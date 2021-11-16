import { memo } from 'react'
import { NavLink } from "react-router-dom"
import {renderRoutes} from "react-router-config"

import styled from "styled-components"

export default memo(function Home({route}) {
  return (
    <HomeWrapper className="home">
      { renderRoutes(route.routes) }
      <div className="menu">
        <NavLink to="/home/new">新建</NavLink>
        <NavLink to="/home/mine">我的</NavLink>
      </div>
    </HomeWrapper>
  )
})

const HomeWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
  background-color: #f4f5f9;
  .menu {
    text-align: center;
    a {
      margin: 0 10px
    }
  }
`