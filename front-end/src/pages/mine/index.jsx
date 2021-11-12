import { memo } from 'react'

import styled from "styled-components"

import AppHeader from "src/components/app-header"

export default memo(function Mine(props) {
  console.log("mine", props)
  return (
    <MineWrapper>
      <AppHeader title="我的投票"></AppHeader>
    </MineWrapper>
  )
})

const MineWrapper = styled.div``

