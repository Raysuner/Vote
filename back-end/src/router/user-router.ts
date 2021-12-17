import Router from "koa-router"

import { userController } from "../controller/user-controller"

import { verifyUser, handlePassword } from "../middleware/user-middleware"

export const router: Router = new Router({prefix: "/api/register"})

router.post(
    "/",
    verifyUser,
    handlePassword,
    userController.createUser
)
