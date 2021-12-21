import Router from "koa-router";

import { verifyAuth } from "../middleware/auth-middleware";

import { voteController } from "../controller/vote-controller";

export const router = new Router({ prefix: "/api" });

router.get("/vote", verifyAuth, voteController.getMyVote);
router.post("/vote", verifyAuth, voteController.createVote);

router.get("/vote/:voteId", verifyAuth, voteController.getVoteByVoteId);

router.post(
  "/vote/:voteId/option/:optionId",
  verifyAuth,
  voteController.voteOption
);
