const errorTypes = require("../app/error-types")
const voteService = require("../service/vote-service")
const voteMap = require("../main")

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
    const [options] = await voteService.getVoteOptions(vote_id)
    const [voted] = await voteService.getVoteStatus(vote_id)

    ctx.body = {info, options, voted}
  }

  async voteOption(ctx, next) {
    const user_id = ctx.user.id
    const {vote_id, option_id} = ctx.params
    let result = null

    const [voteInfo] = await voteService.getVoteInfo(vote_id)
    //判断是否已经过了截止日期
    // if (Date.now() > new Date(voteInfo.deadline).getTime()) {
    //   const error = new Error(errorTypes.DEADLINE_PASSED)
    //   return ctx.app.emit("error", error, ctx)
    // }
    if (voteInfo) { // 查看是否有这个投票
      const multiple = voteInfo.multiple
      if (multiple === "1") {  // 是否是多选
        const [voted = undefined] = await voteService.isVotedMultiple(user_id, vote_id, option_id)
        if (voted) {  // 是否投递过选项
          result = await voteService.deleteOption(user_id, vote_id, option_id)
        } else {
          result = await voteService.addOption(user_id, vote_id, option_id)
        }
      } else {
        const [voted = undefined] = await voteService.isVotedSingle(user_id, vote_id)
        if (voted) { // 是否投递过选项
          if (voted.option_id === option_id) {
            result = await voteService.deleteOption(user_id, vote_id, option_id)
          } else {
            result = await voteService.updateOption(user_id, vote_id, option_id)
          }
        } else {
          result = await voteService.addOption(user_id, vote_id, option_id)
        }
      }
      const [voted] = await voteService.getVoteStatus(vote_id)
      if (voteMap && voteMap[vote_id]) {
        voteMap[vote_id].forEach(ws => {
          ws.send(JSON.stringify(voted))
        })
      }
    }
    ctx.body = result
  }
}

module.exports = new VoteController()