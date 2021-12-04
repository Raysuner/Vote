const Router = require("koa-router")
const authController = require("../controller/auth-controller")
const authMiddleWare = require("../middleware/auth-middleware")

const authRouter = new Router({prefix: "/api"})

authRouter.post(
    "/login",
    authMiddleWare.verifyLogin,
    authController.login
)

authRouter.get(
    "/login-user",
    authMiddleWare.verifyAuth,
    authController.getLoginUser
)

module.exports = authRouter