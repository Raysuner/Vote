const errorTypes = require("../app/error-types")
const voteService = require("../service/vote-service")

class VoteController {
  async createVote(ctx, next) {
    const voteInfo = ctx.request.body
    const user_id = ctx.user.id
    const result = await voteService.createVote(voteInfo, user_id)
    if (!result) {
      const error = new Error(errorTypes.DATABASE_ERROR)
      return ctx.app.emit("error", error, ctx)
    }
    ctx.body = result
  }

  async getVoteByName(ctx, next) {
    const user_id = ctx.user.id
    const [result] = await voteService.getVoteByName(user_id)
    if (!result) {
      const error = new Error(errorTypes.DATABASE_ERROR)
      return ctx.app.emit("error", error, ctx)
    }
    ctx.body = result
  }

  async getVoteByVoteId(ctx, next) {
    const vote_id = ctx.params.id
    const result = await voteService.getVoteByVoteId(vote_id)
    if (!result) {
      const error = new Error(errorTypes.DATABASE_ERROR)
      return ctx.app.emit("error", error, ctx)
    }
    ctx.body = result
  }
}

module.exports = new VoteController()