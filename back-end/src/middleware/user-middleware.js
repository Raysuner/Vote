const errorType = require("../app/error-types");
const userService = require("../service/user-service")
const encryption = require("../utils/encryption")

const verifyUser = async (ctx, next) => {
    const { name, password } = ctx.request.body
    // console.log(name, password);

    if (!name || !password) {
        const error = new Error(errorType.USERNAME_AND_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error", error, ctx)
    }

    const result = await userService.getUserByName(name)
    if (result.length) {
        const error = new Error(errorType.USER_ALREADY_EXIST)
        return ctx.app.emit("error", error, ctx)
    }
    await next()
}

const handlePassword = async (ctx, next) => {
    let {password} = ctx.request.body
    password = encryption.encryptionPassword(password)
    ctx.request.body.password = password
    await next()
}

module.exports = {
    verifyUser,
    handlePassword,
}