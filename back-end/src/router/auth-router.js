const Router = require("koa-router")
const authController = require("../controller/auth_controller")
const authMiddleWare = require("../middleware/auth_middleware")

const authRouter = new Router()

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