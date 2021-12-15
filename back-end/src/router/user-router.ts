import Router from "koa-router"

import { userController } from "../controller/user-controller"

import { verifyUser, handlePassword } from "../middleware/user-middleware"

export const userRouter: Router = new Router({prefix: "/api/register"})

userRouter.post(
    "/",
    verifyUser,
    handlePassword,
    userController.createUser
)