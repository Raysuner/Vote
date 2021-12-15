import { WebSocketServer } from "ws"

import app from './app/index'
import config from './app/config'

const server = app.listen(config.APP_PORT, () => {
  console.log(`服务器启动成功 ${config.APP_PORT}`)
})

// wss => websocket server
const wss = new WebSocketServer({ server })

const voteMap = {}

wss.on("connection", (ws, req) => {
  if (req.url.match(/^\/realtime\/\d+$/)) {
    const matchRes = req.url.match(/\d+$/)
    const voteId = matchRes && matchRes[0]
    if (voteMap[voteId]) {
      voteMap[voteId].push(ws)
    } else {
      voteMap[voteId] = [ws]
    }
    ws.on("close", () => {
      // let idx = -1
      // while ((idx = voteMap[voteId].indexOf(ws)) > -1) {
      //   console.log(idx)
      //   voteMap[voteId].splice(idx, 1)
      // }
      const idx = voteMap[voteId].indexOf(ws) // 网络卡顿时，连续点击两次会创建两个，删除一个还会遗留一个
      if (idx > -1) {
        voteMap[voteId].splice(idx, 1)
      } else {
        console.error("当前voteMap没有这条websocket")
      }
    })
  } else {
    console.log("ws to be closed")
    ws.close()
  }
})

module.exports = voteMap
