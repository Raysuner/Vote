const jwt = require("jsonwebtoken")
const errorType = require("../app/error-types")
const userService = require("../service/user_service")
const encryption = require("../utils/encryption")
const authService = require("../service/auth_service")
const { PUBLIC_KEY } = require("../app/config")

const verifyLogin = async (ctx, next) => {
    const { name, password } = ctx.request.body
    // console.log(name, password)

    if (!name || !password) {
        const error = new Error(errorType.USERNAME_AND_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error", error, ctx)
    }

    const result = await userService.getUserByName(name)
    const user = result[0]
    // console.log(user)

    if (!user) {
        const error = new Error(errorType.USER_NOT_EXIST)
        return ctx.app.emit("error", error, ctx)
    }

    if (encryption.encryptionPassword(password) !== user.password) {
        const error = new Error(errorType.PASSWORD_IS_NOT_CORRECT)
        return ctx.app.emit("error", error, ctx)
    }

    ctx.user = user

    await next()
}

const verifyAuth = async (ctx, next) => {
    try {
        // 获取token
        const authorization = ctx.headers.authorization
        const token = authorization.replace("Bearer ", "")

        // 验证token
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        })

        if(!result){
            const error = new Error(errorType.UNAUTHORIZATION)
            ctx.app.emit("error", error, ctx)
        }
        else {
            ctx.user = result
            await next()
        }

    } catch (err) {
        if (err.sqlMessage) {
            const error = new Error(errorType.DATABASE_ERROR)
            ctx.app.emit("error", error, ctx)
        }
        else {
            throw err
        }
    }
}

const verifyPermission = async (ctx, next) => {
    const { commentId } = ctx.params
    const { id } = ctx.user
    const isPermission = await authService.checkPermission(id, commentId)
    if (!isPermission) {
        const error = new Error(errorType.UNPERMISSION)
        return ctx.app.emit("error", error, ctx)
    }
    await next()
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}