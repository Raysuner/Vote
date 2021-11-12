import { memo } from 'react'
import { NavLink } from "react-router-dom"
import {renderRoutes} from "react-router-config"

import styled from "styled-components"

export default memo(function Home({route}) {
  return (
    <HomeWrapper>
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
  background-color: lightblue;
`