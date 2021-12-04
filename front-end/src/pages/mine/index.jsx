import { memo, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import styled from "styled-components"

import WithCheckLogin from "src/utils/hoc.js"
import { getVoteByUser } from "src/utils/request"
import AppHeader from "src/components/app-header"

function Mine() {
  // const history = useHistory()
  const [res, setRes] = useState({ data: [] })
  useEffect(() => {
    getVoteByUser().then(setRes)
  }, [])
  return (
    <MineWrapper>
      <AppHeader title="我的投票"></AppHeader>
      <ul className="vote-title-list">
        {res.data.map((item) => {
          return (
            <li key={item.id}>
              <NavLink to={"/vote/" + item.id}>{item.title}</NavLink>
            </li>
          )
        })}
      </ul>
    </MineWrapper>
  )
}

export default WithCheckLogin(memo(Mine))

const MineWrapper = styled.div`
  margin: 0 100px;
  .vote-title-list {
    margin-bottom: 50px;
    li {
      margin: 15px;
      a {
        display: block;
        padding: 10px 20px;
        white-space: nowrap;
        margin: 0 auto;
        text-align: center;
        background-color: #fff;
      }
    }
  }
`
