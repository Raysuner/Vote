import { memo, useEffect} from 'react'

import styled from "styled-components"

export default memo(function Vote() {
  useEffect(() => {

  })
  return (
    <VoteWrapper>
      <h2>{ "查看投票"}</h2>
    </VoteWrapper>
  )
})

const VoteWrapper = styled.div``