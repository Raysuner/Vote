const errorTypes = require("../app/error-types")
const voteService = require("../service/vote-service")

class VoteController {
  async createVote(ctx, next) {
    const voteInfo = ctx.request.body
    const user_id = ctx.user.id
    const result = await voteService.createVote(voteInfo, user_id)
    ctx.body = result
  }

  async getVoteByName(ctx, next) {
    const user_id = ctx.user.id
    const [result] = await voteService.getVoteByName(user_id)
    ctx.body = result
  }

  async getVoteByVoteId(ctx, next) {
    const vote_id = ctx.params.id
    const [result1] = await voteService.getVoteInfo(vote_id)
    const [result2] = await voteService.getVoteOptions(vote_id)
    ctx.body = result1.concat(result2)
  }

  async voteOption(ctx, next) {
    const user_id = ctx.user.id
    const {vote_id, option_id} = ctx.params
    let result = null

    const [voteInfo] = await voteService.getVoteInfo(vote_id)
    if (voteInfo.length) { // 查看是否有这个投票
      const multiple = voteInfo[0].multiple
      const [voted] = await voteService.isVotedOption(user_id, vote_id, option_id)
      if (multiple === "1") {  // 是否是多选
        if (voted.length) {  // 是否已经选过
          result = await voteService.deleteOption(user_id, vote_id, option_id)
        } else {
          result = await voteService.addOption(user_id, vote_id, option_id)
        }
      } else {
        if (voted.length) {
          result = await voteService.deleteOption(user_id, vote_id, option_id)
        } else {
          await voteService.deleteReverseOption(user_id, vote_id, option_id)
          result = await voteService.addOption(user_id, vote_id, option_id)
        }
      }
    }
    ctx.body = result[0]
  }
}

module.exports = new VoteController()