import { voteService } from "../service/vote-service";
import { DEADLINE_PASSED } from "../app/error-types";
import { voteMap } from "../main";
import { Context } from "koa";

class VoteController {
  // 创建一个投票
  async createVote(ctx: Context, next: () => Promise<any>) {
    const voteInfo = ctx.request.body;
    const userId = ctx.user.id;
    const result = await voteService.createVote(voteInfo, userId);
    ctx.body = result;
  }

  async getMyVote(ctx: Context, next: () => Promise<any>) {
    const userId = ctx.user.id;
    const result = await voteService.getMyVote(userId);
    ctx.body = result;
  }

  async getVoteByVoteId(ctx: Context, next: () => Promise<any>) {
    const { voteId } = ctx.params;
    // @ts-ignore
    const [info] = await voteService.getVoteInfo(voteId);
    const [options] = await voteService.getVoteOptions(voteId);
    const [voted] = await voteService.getVoteStatus(voteId);

    ctx.body = { info, options, voted };
  }

  async voteOption(ctx: Context, next: () => Promise<any>) {
    const userId: number = ctx.user.id;
    const { voteId, optionId }: { voteId: number; optionId: number } =
      ctx.params;
    let result: unknown = null;

    // @ts-ignore
    const [voteInfo] = await voteService.getVoteInfo(voteId);
    // 判断是否已经过了截止日期
    // if (Date.now() > new Date(voteInfo.deadline).getTime()) {
    //   const error = new Error(DEADLINE_PASSED)
    //   return ctx.app.emit("error", error, ctx)
    // }
    if (voteInfo) {
      // 查看是否有这个投票
      const multiple: string = voteInfo.multiple;
      if (multiple === "1") {
        // 是否是多选
        // @ts-ignore
        const [voted = undefined] = await voteService.isVotedMultiple(
          userId,
          voteId,
          optionId
        );
        if (voted) {
          // 是否投递过选项
          result = await voteService.deleteOption(userId, voteId, optionId);
        } else {
          result = await voteService.addOption(userId, voteId, optionId);
        }
      } else {
        // @ts-ignore
        const [voted = undefined] = await voteService.isVotedSingle(
          userId,
          voteId
        );
        if (voted) {
          // 是否投递过选项
          if (voted.optionId === optionId) {
            result = await voteService.deleteOption(userId, voteId, optionId);
          } else {
            result = await voteService.updateOption(userId, voteId, optionId);
          }
        } else {
          result = await voteService.addOption(userId, voteId, optionId);
        }
      }
      const [voted] = await voteService.getVoteStatus(voteId);
      if (voteId in voteMap) {
        // console.log(Object.entries(voteMap))
        voteMap[voteId].forEach((ws) => {
          ws.send(JSON.stringify(voted));
        });
      }
    }
    ctx.body = result;
  }
}

export const voteController = new VoteController();
