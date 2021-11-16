import { memo, useCallback, useEffect, useState } from 'react'

import groupBy from "lodash/groupBy"
import uniqBy from "lodash/uniqBy"
import styled from "styled-components"

import { getVoteByVoteId, voteOption } from "src/utils/request"
import { useParams } from "react-router-dom"
import AppHeader from "src/components/app-header"

export default memo(function Vote() {
  const params = useParams()
  const [voted, setVoted] = useState([])
  const [info, setInfo] = useState([])
  const [options, setOptions] = useState([])
  // const [users, setUsers] = useState([])
  const [update, setUpdate] = useState(0) // 用来在点击选项的时候刷新页面

  // debugger
  useEffect(() => {
    getVoteByVoteId(params.id).then(res => {
      // console.log(res.data)
      setVoted(res.data.voted)
      setInfo(res.data.info)
      setOptions(res.data.options)
      // setUsers(res.data.users)
    })
  }, [params.id, update])

  const handleSelect = useCallback((voteId, optionId) => {
    voteOption(voteId, optionId).then(() => setUpdate(update => update + 1))
  }, [])

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
          <span className="muti">{ info?.multiple === "1" ? "[多选]" : "[单选]"}</span>
          <span className="anony">{info?.anony === "1" ? "[匿名]" : "[公开]"}</span>
        </div>
        <ul className="main-options">
          {
            options && options.map((option, index) => {
              return (
                <li
                  onClick={() => handleSelect(option.vote_id, option.id)}
                  key={option.id}
                >
                  <div className="number-info">
                    <span className="option-content">{option.content}</span>
                    <span className="count">{getVoteCount(voted, "option_id", option.id)}票</span>
                    <span className="rate">{getRate(getVoteCount(voted, "option_id", option.id), getUserCount(voted, "user_id"))}%</span>
                  </div>
                  <div className="avatar-list">
                    {
                      getOptionUserId(voted, "option_id", option.id)?.map(item => {
                        return <span key={item.id} className="avatar">{item.user_id}</span>
                      })
                    }
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className="deadline">截止日期：{ info?.deadline}</div>
      </div>
    </VoteWrapper>
  )
})

const VoteWrapper = styled.div`
  margin: 0 100px;
  .vote-info{
    .top-options {
      span {
        color: #4073f4;
        padding-right: 5px;
      }
    }
    .main-options {
      li {
        position: relative;
        margin: 20px 0;
        padding: 10px 20px;
        background-color: #fff;
        .number-info {
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
            padding-right: 5px;
          }
        }
      }
    }
  }
`