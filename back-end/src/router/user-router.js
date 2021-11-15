const Router = require("koa-router")

const {
    createUser
} = require("../controller/user-controller")

const {
    verifyUser,
    handlePassword
} = require("../middleware/user-middleware")

const userRouter = new Router({prefix: "/api/register"})

userRouter.post(
    "/",
    verifyUser,
    handlePassword,
    createUser
)

module.exports = userRouter