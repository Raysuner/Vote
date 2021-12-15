const Router = require("koa-router")

const {
  verifyAuth
} = require("../middleware/auth-middleware")

const {
  createVote,
  getVote,
  getVoteByVoteId,
  isVotedOption,
  voteOption
} = require("../controller/vote-controller")

const router = new Router({prefix: "/api"})

router.get("/vote", verifyAuth, getVote)
router.post("/vote", verifyAuth, createVote)

router.get("/vote/:id", verifyAuth, getVoteByVoteId)

router.post("/vote/:vote_id/option/:option_id", verifyAuth, voteOption)

module.exports = router