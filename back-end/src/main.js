const { WebSocketServer } = require("ws")

const app = require('./app/index')
const config = require('./app/config')

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
      const idx = voteMap[voteId].indexOf(ws)
      if (idx > -1) {
        voteMap[voteId].splice(idx, 1)
      } else {
        console.error("当前voteMap没有这条websocket")
      }
    })
  } else {
    ws.close()
  }
})

module.exports = voteMap
