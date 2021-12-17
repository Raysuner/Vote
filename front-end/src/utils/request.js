import axios from "axios"

export const request = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000
})

request.interceptors.request.use(config => {
  const user = window.localStorage.getItem("user")
  if (user) {
    const token = JSON.parse(user).token
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  Promise.reject(error)
})

export const login = user => {
  return {
    url: "/api/login",
    method: "POST",
    data: user
  }
}

export const register = user => {
  return {
    url: "/api/register",
    method: "POST",
    data: user
  }
}

export const getLoginUser = () => {
  return {
    url: "/api/login-user"
  }
}

export const createVote = info => {
  return {
    url: "/api/vote",
    method: "POST",
    data: info
  }
}

export const getVotesByUser = () => {
  return {
    url: "/api/vote",
  }
}

export const getVoteByVoteId = voteId => {
  return {
    url: `/api/vote/${voteId}`,
  }
}

export const voteOption = (voteId, option) => {
  return {
    url: `/api/vote/${voteId}/option/${option}`,
    method: "POST"
  }
}