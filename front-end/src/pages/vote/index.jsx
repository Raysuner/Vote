import { memo, useCallback, useEffect, useState } from "react"

import groupBy from "lodash/groupBy"
import uniqBy from "lodash/uniqBy"
import styled from "styled-components"

import WithCheckLogin from "src/utils/hoc.js"
import { getVoteByVoteId, voteOption } from "src/utils/request"
import { useParams } from "react-router-dom"
import AppHeader from "src/components/app-header"

function Vote({ user }) {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState({}) // 每个投票的信息
  const [httpVoted, setHttpVoted] = useState() // 每个投票被投过的信息
  const [wsVoted, setWsVoted] = useState()
  const [options, setOptions] = useState([]) // 每个投票的选项
  const [count, setCount] = useState(0) // 用来在点击选项的时候刷新页面

  // debugger
  useEffect(() => {
    getVoteByVoteId(params.id).then((res) => {
      setLoading(false)
      setHttpVoted(res.data.voted)
      setInfo(res.data.info)
      setOptions(res.data.options)
    })
  }, [params.id, count])

  useEffect(() => {
    // if (loading || Date.now() > new Date(info.deadline).getTime()) {
    //   return
    // }
    if (loading) {
      return
    }
    const wsUrl = `${window.location.protocol.replace("http", "ws")}//${
      window.location.host
    }/realtime/${params.id}`
    const ws = new WebSocket(wsUrl)
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      console.log("websocket传回的数据", data)
      setWsVoted(data)
    }
    return () => ws.close()
  }, [loading, params.id])

  const handleSelect = useCallback((voteId, optionId) => {
    // debugger
    voteOption(voteId, optionId).then(() => {
      setCount((count) => count + 1)
    })
  }, [])

  const voted = wsVoted ?? httpVoted
  // console.log("voted", voted)

  //TODO 注释的写法会更好，因为有useMemo的缓存，暂时先这样实现
  // const userVoted = voted ?? []

  // //通过option_id分组后的投票
  // const groupedVoted = useMemo(() => groupBy(userVoted, "option_id"), [userVoted])
  // //通过去重后的投票用户人数
  // const userCount = useMemo(() => uniqBy(userVoted, "user_id").length, [userVoted])
  // const percent = useMemo(() => {

  // })

  // console.log("groupedVoted", groupedVoted)
  // console.log("userCount", userCount)

  const getVoteCount = useCallback((voted, key, optionId) => {
    return groupBy(voted, key)[optionId]?.length || 0
  }, [])

  const getUserCount = useCallback((voted, key) => {
    return uniqBy(voted, key)?.length || 0
  }, [])

  const getOptionUserId = useCallback((voted, key, optionId) => {
    return groupBy(voted, key)[optionId]
  }, [])

  const getRate = useCallback((voteCount, userCount) => {
    if (userCount === 0) return 0
    else return ((voteCount / userCount) * 100).toFixed(2)
  }, [])

  // 下面使用?.的原因是刚开始info，options这些变量拿不到数据，等网络请求成功后才有数据，为了避免报错而使用的
  return (
    <VoteWrapper>
      <AppHeader title="腾讯投票"></AppHeader>
      <div className="vote-info">
        <h1 className="title">{info?.title}</h1>
        <div className="top-options">
          <span className="muti">
            {info?.multiple === "1" ? "[多选]" : "[单选]"}
          </span>
          <span className="anony">
            {info?.anony === "1" ? "[匿名]" : "[公开]"}
          </span>
        </div>
        <ul className="main-options">
          {options &&
            options.map((option, index) => {
              return (
                <li
                  onClick={() => handleSelect(option.vote_id, option.id)}
                  key={option.id}
                >
                  <div className="number-info">
                    <span className="option-content">{option.content}</span>
                    <span className="count">
                      {getVoteCount(voted, "option_id", option.id)}票
                    </span>
                    <span className="rate">
                      {getRate(
                        getVoteCount(voted, "option_id", option.id),
                        getUserCount(voted, "user_id")
                      )}
                      %
                    </span>
                  </div>
                  <div className="avatar-list">
                    {getOptionUserId(voted, "option_id", option.id)?.map(
                      (item) => {
                        // return <img key={item.id} src={ item.avatar } className="avatar"></img>
                        return (
                          <span key={item.id} className="avatar">
                            {item.user_id}
                          </span>
                        )
                      }
                    )}
                  </div>
                </li>
              )
            })}
        </ul>
        <div className="deadline">截止日期：{info?.deadline}</div>
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
