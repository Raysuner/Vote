import { memo, useEffect, useState } from 'react'

import styled from "styled-components"

import { getVoteByVoteId } from "src/utils/request"
import { useParams } from "react-router-dom"
import AppHeader from "src/components/app-header"

export default memo(function Vote() {
  const [res, setRes] = useState({ data: [] })
  const params = useParams()
  useEffect(() => {
    getVoteByVoteId(params.id).then(setRes)
  }, [params.id])
  return (
    <VoteWrapper>
      <AppHeader title="腾讯投票"></AppHeader>
      <div className="vote-info">
        <div className="title">{res.data[0]?.title}</div>
        <div className="multi">{res.data[0]?.anony}</div>
        <ul className="options">
          {
            res.data.map((item, index) => {
              return index > 0 && <li key={item.id}>{item.content}</li>
            })
          }
        </ul>
      </div>
    </VoteWrapper>
  )
})

const VoteWrapper = styled.div``