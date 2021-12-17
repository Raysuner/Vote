import { memo, useMemo, useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import groupBy from "lodash/groupBy"
import uniqBy from "lodash/uniqBy"
import styled from "styled-components"

import WithCheckLogin from "src/utils/hoc.js"
import { useAxios } from "src/utils/hooks"
import { getVoteByVoteId, voteOption, request } from "src/utils/request"
import AppHeader from "src/components/app-header"

function Vote({ user }) {
  const { id: voteId } = useParams()
  const { response, update } = useAxios(getVoteByVoteId(voteId))
  const [wsVoted, setWsVoted] = useState()

  useEffect(() => {
    // if (Date.now() > new Date(info.deadline).getTime()) {
    //   return
    // }
    const wsUrl = `${window.location.protocol.replace("http", "ws")}//${
      window.location.host
    }/realtime/${voteId}`

    const ws = new WebSocket(wsUrl)
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setWsVoted(data)
    }
    return () => ws.close()
  }, [voteId])

  const handleSelect = (voteId, optionId) => {
    request(voteOption(voteId, optionId)).then(() => update())
  }

  const httpVoted = response?.voted
  const voted = useMemo(() => wsVoted ?? httpVoted ?? [], [httpVoted, wsVoted])

  //通过option_id分组后的投票
  const groupedVoted = useMemo(() => groupBy(voted, "optionId"), [voted])
  //通过去重后的投票用户人数
  const userCount = useMemo(() => uniqBy(voted, "userId").length, [voted])

  // console.log("groupedVoted", groupedVoted)
  // console.log("userCount", userCount)

  // 当前选项的投票数
  const getOptionUsers = (optionId) => {
    return groupedVoted[optionId] || []
  }

  const getVoteCount = (optionId) => getOptionUsers(optionId)?.length || 0

  // 当前选项投票占整个投票的百分比
  const getPercent = (voteCount, userCount) => {
    if (userCount === 0) return 0
    else return ((voteCount / userCount) * 100).toFixed(2)
  }

  // if (loading) {
  //   return "loading..."
  // }

  return (
    <VoteWrapper>
      <AppHeader title="腾讯投票"></AppHeader>
      <div className="vote-info">
        <h1 className="title">{response?.info.title}</h1>
        <div className="top-options">
          <span className="muti">
            {response?.info.multiple === "1" ? "[多选]" : "[单选]"}
          </span>
          <span className="anony">
            {response?.info.anony === "1" ? "[匿名]" : "[公开]"}
          </span>
        </div>
        <ul className="main-options">
          {response?.options &&
            response?.options.map((option, index) => {
              return (
                <li key={option.id}>
                  <div
                    className="number-info"
                    onClick={() => handleSelect(option.voteId, option.id)}
                  >
                    <span className="option-content">{option.content}</span>
                    <span className="count">{getVoteCount(option.id)}票</span>
                    <span className="rate">
                      {getPercent(getVoteCount(option.id), userCount)}%
                    </span>
                  </div>
                  <div className="avatar-list">
                    {getOptionUsers(option.id).map((user) => {
                      // return <img key={users.id} src={ users.avatar } className="avatar"></img>
                      return (
                        <span key={user.id} className="avatar">
                          {user.userId}
                        </span>
                      )
                    })}
                  </div>
                </li>
              )
            })}
        </ul>
        <div className="deadline">截止日期：{response?.info.deadline}</div>
      </div>
    </VoteWrapper>
  )
}

export default WithCheckLogin(memo(Vote))

const VoteWrapper = styled.div`
  margin: 0 100px;
  .vote-info {
    .top-options {
      span {
        color: #4073f4;
        padding-right: 5px;
      }
    }
    .main-options {
      margin: 20px 0;
      li {
        position: relative;
        .number-info {
          margin: 5px 0;
          padding: 10px 20px;
          cursor: pointer;
          background-color: #fff;
          .count {
            position: absolute;
            left: 480px;
            top: 10px;
          }
          .rate {
            position: absolute;
            left: 530px;
            top: 10px;
          }
        }
        .avatar-list {
          span {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 16px;
            border: 2px solid;
            border-radius: 999px;
            text-align: center;
            margin-right: 5px;
          }
        }
      }
    }
  }
`
