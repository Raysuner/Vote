const service = require("../service/user-service")

const errorTypes = require("../app/error-types")

class UserController {
    async createUser(ctx, next) {
        const user = ctx.request.body
        const result = await service.createUser(user)
        if(!result) {
          const error = new Error(errorTypes.DATABASE_ERROR)
          return ctx.app.emit("error", error, ctx)
        }
        ctx.body = "注册成功"
    }
}

module.exports = new UserController()