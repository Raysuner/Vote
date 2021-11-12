const service = require("../service/user_service")

class UserController {
    async createUser(ctx, next) {
        const user = ctx.request.body
        const result = await service.createUser(user)
        ctx.body = result
    }
}

module.exports = new UserController()