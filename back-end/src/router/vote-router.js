const Router = require("koa-router")

const {
  verifyAuth
} = require("../middleware/auth-middleware")

const {
  createVote,
  getVoteByName,
  getVoteByVoteId
} = require("../controller/vote-controller")

const router = new Router()

router.get("/my-vote", verifyAuth, getVoteByName)
router.get("/vote/:id", verifyAuth, getVoteByVoteId)
router.post("/create-vote", verifyAuth, createVote)

module.exports = router