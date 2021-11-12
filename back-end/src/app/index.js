const Koa = require("koa")
const bodyparser = require("koa-bodyparser")
const useAllRoutes = require("../router/index")
const { errorHandler } = require("./error-handler")

const app = new Koa()

app.useAllRoutes = useAllRoutes
app.use(bodyparser())
app.useAllRoutes()

app.on("error", errorHandler)

module.exports = app