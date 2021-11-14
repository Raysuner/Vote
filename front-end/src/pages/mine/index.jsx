import { memo, useEffect, useContext, useState } from 'react'
import { NavLink, useHistory } from "react-router-dom"

import styled from "styled-components"

import { LoginContext } from "src/common/context/context"
import { getVoteByUser } from "src/utils/request"
import AppHeader from "src/components/app-header"

export default memo(function Mine() {
  // const { isLogin } = useContext(LoginContext)
  const history = useHistory()
  const [res, setRes] = useState({data: []})

  // console.log("isLogin", isLogin)
  // if (!isLogin) {
  //   history.push("/login")
  // }
  useEffect(() => {
    getVoteByUser().then(setRes)
  }, [])
  return (
    <MineWrapper>
      <AppHeader title="我的投票"></AppHeader>
      <ul className="vote-title-list">
        {
          res.data.map(item => {
            return <li key={item.id}><NavLink to="#">{item.title}</NavLink></li>
          })
        }
      </ul>
    </MineWrapper>
  )
})

const MineWrapper = styled.div`
  .vote-title-list {
    margin-bottom: 50px;
    li {
      margin: 15px 0;
      a {
        width: 200px;
        display: block;
        margin: 0 auto;
        text-align: center;
        background-color: #fff;
      }
    }
  }
`

