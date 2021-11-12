import { memo } from 'react'

import styled from "styled-components"

export default memo(function Create() {
  return (
    <CreacteWrapper>
      <div><input type="text" placeholder="投票标题"/></div>
      <div><input type="text" placeholder="补充描述(选填)"/></div>
      <div><input type="text" placeholder="选项"/></div>
      <div><input type="text" placeholder="选项"/></div>
      <div><button>添加选项</button></div>
    </CreacteWrapper>
  )
})

const CreacteWrapper = styled.div`

`
