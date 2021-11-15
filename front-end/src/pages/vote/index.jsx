import { memo, useCallback, useEffect, useState } from 'react'

import styled from "styled-components"

import { getVoteByVoteId, voteOption } from "src/utils/request"
import { useParams } from "react-router-dom"
import AppHeader from "src/components/app-header"

export default memo(function Vote() {
  const [res, setRes] = useState({ data: [] })
  const params = useParams()

  useEffect(() => {
    getVoteByVoteId(params.id).then(setRes)
  }, [params.id])

  const handleSelect = useCallback((voteId, optionId) => {
    voteOption(voteId, optionId).then(console.log)
  }, [])
  return (
    <VoteWrapper>
      <AppHeader title="腾讯投票"></AppHeader>
      <div className="vote-info">
        <h1 className="title">{res.data[0]?.title}</h1>
        <div>
          <span className="muti">{ res.data[0].multuple === "1" ? "多选" : "单选"}</span>
          <span className="anony">{res.data[0]?.anony === "1" ? "匿名" : "公开"}</span>
        </div>
        <ul className="options">
          {
            res.data.map((item, index) => {
              return index > 0 &&
                <li
                  onClick={() => handleSelect(item.vote_id, item.id)}
                  key={item.id}
                >
                  {item.content}
                </li>
            })
          }
        </ul>
      </div>
    </VoteWrapper>
  )
})

const VoteWrapper = styled.div``