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

export const login = (user) => {
  return request({
    url: "/account/login",
    method: "POST",
    data: user
  })
}

export const register = user => {
  return request({
    url: "/account/register",
    method: "POST",
    data: user
  })
}

export const createVote = info => {
  return request({
    url: "/create-vote",
    method: "POST",
    data: info
  })
}

export const getVoteByUser = () => {
  return request({
    url: "/my-vote",
  })
}

export const getVoteByVoteId = voteId => {
  return request({
    url: `/vote/${voteId}`,
  })
}