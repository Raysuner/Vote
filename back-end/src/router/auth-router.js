const Router = require("koa-router")
const authController = require("../controller/auth-controller")
const authMiddleWare = require("../middleware/auth-middleware")

const authRouter = new Router({prefix: "/account"})

authRouter.post(
    "/login",
    authMiddleWare.verifyLogin,
    authController.login
)

authRouter.get(
    "/test",
    authMiddleWare.verifyAuth,
    authController.authSuccess
)

module.exports = authRouter