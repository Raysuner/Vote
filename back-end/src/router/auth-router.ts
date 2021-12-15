import Router from "koa-router"
import { authController } from "../controller/auth-controller"
import { verifyAuth, verifyLogin } from "../middleware/auth-middleware"

export const authRouter: Router = new Router({prefix: "/api"})

authRouter.post(
    "/login",
    verifyLogin,
    authController.login
)

authRouter.get(
    "/login-user",
    verifyAuth,
    authController.getLoginUser
)