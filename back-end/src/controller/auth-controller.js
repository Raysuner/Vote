const jwt = require("jsonwebtoken")
const { PRIVATE_KEY } = require("../app/config")

class AuthController {
  async login(ctx, next) {
    const { id, name, avatar } = ctx.user
    const token = jwt.sign({ id, name, avatar }, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 60 * 60 * 24 * 1
    })
    ctx.body = { id, name, token }
  }

  async getLoginUser(ctx, next) {
    const {id, name, avatar} = ctx.user
    ctx.body = {id, name, avatar}
  }
}

module.exports = new AuthController()