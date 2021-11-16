const errorTypes = require("../app/error-types")
const voteService = require("../service/vote-service")

class VoteController {
  async createVote(ctx, next) {
    const voteInfo = ctx.request.body
    const user_id = ctx.user.id
    const result = await voteService.createVote(voteInfo, user_id)
    ctx.body = result
  }

  async getVote(ctx, next) {
    const [result] = await voteService.getVote()
    ctx.body = result
  }

  async getVoteByVoteId(ctx, next) {
    const vote_id = ctx.params.id
    const [info] = await voteService.getVoteInfo(vote_id)
    const [voted] = await voteService.getVoteStatus(vote_id)
    const [options] = await voteService.getVoteOptions(vote_id)
    const [users] = await voteService.getVotedUsers(vote_id)
    ctx.body = {info: info[0], voted, options, users}
  }

  async voteOption(ctx, next) {
    const user_id = ctx.user.id
    const {vote_id, option_id} = ctx.params
    let result = null

    const [voteInfo] = await voteService.getVoteInfo(vote_id)
    if (voteInfo.length) { // 查看是否有这个投票
      const multiple = voteInfo[0].multiple
      if (multiple === "1") {  // 是否是多选
        const [voted] = await voteService.isVotedMultiple(user_id, vote_id, option_id)
        if (voted.length) {  // 是否已经选过
          result = await voteService.deleteOption(user_id, vote_id, option_id)
        } else {
          result = await voteService.addOption(user_id, vote_id, option_id)
        }
      } else {
        const [voted] = await voteService.isVotedSingle(user_id, vote_id)
        if (voted.length) {
          if (voted.option_id === option_id) {
            result = await voteService.deleteOption(user_id, vote_id, option_id)
          } else {
            result = await voteService.updateOption(user_id, vote_id, option_id)
          }
        } else {
          result = await voteService.addOption(user_id, vote_id, option_id)
        }
      }
    }
    ctx.body = result[0]
  }
}

module.exports = new VoteController()