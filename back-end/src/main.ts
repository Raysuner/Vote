import { WebSocketServer } from "ws"

import { } from "ws"

import { app } from './app/index'
import { APP_PORT } from './app/config'

const server = app.listen(APP_PORT, () => {
  console.log(`服务器启动成功 ${APP_PORT}`)
})

// wss => websocket server
const wss = new WebSocketServer({ server })

export const voteMap: { [index: string]: Array<WebSocket>} = {}

wss.on("connection", (ws, req) => {
  if (req.url?.match(/^\/realtime\/\d+$/)) {
    const matchRes = req.url.match(/\d+$/)
    const voteId = matchRes && matchRes[0]
    if (voteId) {
      if (voteMap[voteId]) {
        console.log("voteMap", voteMap)
        // @ts-ignore
        voteMap[voteId].push(ws)
      } else {
        // @ts-ignore
        voteMap[voteId] = [ws]
      }
    }
    ws.on("close", () => {
        // @ts-ignore
      const idx = voteMap[voteId].indexOf(ws) // 网络卡顿时，连续点击两次会创建两个，删除一个还会遗留一个
      if (idx > -1) {
        // @ts-ignore
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