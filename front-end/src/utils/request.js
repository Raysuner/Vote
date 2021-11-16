import axios from "axios"

const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000
})

request.interceptors.request.use(config => {
  const user = window.localStorage.getItem("user")
  if (user) {
    let token = JSON.parse(user).token
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  Promise.reject(error)
})

export const login = user => {
  return request({
    url: "/api/login",
    method: "POST",
    data: user
  })
}

export const register = user => {
  return request({
    url: "/api/register",
    method: "POST",
    data: user
  })
}

export const createVote = info => {
  return request({
    url: "/api/vote",
    method: "POST",
    data: info
  })
}

export const getVoteByUser = () => {
  return request({
    url: "/api/vote",
  })
}

export const getVoteByVoteId = voteId => {
  return request({
    url: `/api/vote/${voteId}`,
  })
}

export const voteOption = (voteId, option) => {
  return request({
    url: `/api/vote/${voteId}/option/${option}`,
    method: "POST"
  })
}