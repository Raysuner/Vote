import { memo } from "react"
import { NavLink } from "react-router-dom"

import styled from "styled-components"

import { getVotesByUser } from "src/utils/request"
import { useAxios } from "src/utils/hooks"
import withAuth from "src/utils/hoc.js"
import AppHeader from "src/components/app-header"

function Mine() {
  const { loading, response } = useAxios(getVotesByUser()) // /api/vote

  if (loading) {
    return null
  }

  return (
    <MineWrapper>
      <AppHeader title="我的投票"></AppHeader>
      <ul className="vote-title-list">
        {response.map((item) => {
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

export default withAuth(memo(Mine))

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
