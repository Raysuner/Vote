import { memo } from "react"
import { useHistory } from "react-router-dom"

import styled from "styled-components"

import { useInput, useBoolInput, useArray, useQuery } from "src/utils/hooks"
import withAuth from "../../utils/hoc"
import { createVote } from "src/utils/request"

function Create() {
  const history = useHistory()

  const { array, add, remove, modify } = useArray()
  const title = useInput()
  const desc = useInput()
  const deadline = useInput()
  const anonymous = useBoolInput()
  const queryParam = useQuery("multiple")

  const create = async () => {
    const voteInfo = {
      title: title.value,
      desc: desc.value,
      deadline: deadline.value,
      anonymous: anonymous.checked,
      multiple: queryParam === "1" ? true : false,
      options: array
    }
    try {
      await createVote(voteInfo)
      history.push("/main/mine")
    } catch (error) {
      console.error("创建投票失败")
    }
  }

  return (
    <CreacteWrapper>
      <div>
        <input type="text" placeholder="投票标题" {...title} />
      </div>
      <div>
        <input type="text" placeholder="补充描述(选填)" {...desc} />
      </div>
      {array.map((item, idx) => (
        <div key={idx}>
          <input
            type="text"
            placeholder="选项"
            value={item}
            onChange={(event) => modify(idx, event.target.value)}
          />
          <button onClick={() => remove(idx)}>-</button>
        </div>
      ))}
      <div>
        <button onClick={() => add("")}>添加选项</button>
      </div>
      <div>
        <input type="date" {...deadline} />
      </div>
      <div>
        匿名投票：
        <input type="checkbox" {...anonymous} />
      </div>
      <div>
        <button onClick={create}>创建投票</button>
      </div>
    </CreacteWrapper>
  )
}

export default withAuth(memo(Create))

const CreacteWrapper = styled.div``
