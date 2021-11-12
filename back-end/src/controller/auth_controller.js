const jwt = require("jsonwebtoken")
const {PRIVATE_KEY} = require("../app/config")

class AuthController {
    async login(ctx, next) {
        const { id, name } = ctx.user
        const token = jwt.sign({ id, name }, PRIVATE_KEY, {
            algorithm: "RS256",
            expiresIn: 60 * 60 * 24 * 7
        })
        ctx.body = {id, name, token}
    }

    async authSuccess(ctx, next) {
        ctx.body = "授权成功"
    }
}

module.exports = new AuthController()