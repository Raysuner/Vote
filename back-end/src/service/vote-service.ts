import { db } from "../app/database";

class VoteService {
  async createVote(voteInfo: Object, userId: number) {
    const voteStatement: string = `INSERT INTO
      vote(userId, title, descr, deadline, anony, multiple)
      VALUES(?, ?, ?, ?, ?, ?)
    `;
    const optionStatement: string = `INSERT INTO opt(voteId, content) VALUES(?, ?)`;

    const info = [userId].concat(Object.values(voteInfo));
    const options = info.pop();

    const [result] = await db.execute(voteStatement, info);
    // @ts-ignore
    const voteId = result.insertId;

    // @ts-ignore
    for (const option of options) {
      await db.execute(optionStatement, [voteId, option]);
    }
    return result;
  }

  async getMyVote(userId: number) {
    const statement = `SELECT * FROM vote WHERE userId = ?`;
    const [result] = await db.execute(statement, [userId]);
    return result;
  }

  //用户为当前投票的投票情况
  async getVoteStatus(voteId: number) {
    const statement = `
      SELECT voteoption.id, userId, optionId, avatar FROM voteoption JOIN user on user.id = voteoption.userId WHERE voteId = ?
    `;
    const result = await db.execute(statement, [voteId]);
    return result;
  }

  //获取单个投票信息
  async getVoteInfo(voteId: number) {
    const statement = `SELECT title, multiple, anony, deadline FROM vote WHERE id = ?`;
    const [result] = await db.execute(statement, [voteId]);
    return result;
  }

  //获取单个投票所有投票选项
  async getVoteOptions(voteId: number) {
    const statement = `SELECT id, voteId, content FROM opt WHERE voteId = ?`;
    const result = await db.execute(statement, [voteId]);
    return result;
  }

  async isVotedMultiple(userId: number, voteId: number, optionId: number) {
    const statement = `SELECT * FROM voteOption WHERE userId = ? AND voteId = ? AND optionId = ?`;
    const [result] = await db.execute(statement, [userId, voteId, optionId]);
    return result;
  }

  async isVotedSingle(userId: number, voteId: number) {
    const statement = `SELECT * FROM voteOption WHERE userId = ? AND voteId = ?`;
    const [result] = await db.execute(statement, [userId, voteId]);
    return result;
  }

  async addOption(userId: number, voteId: number, optionId: number) {
    const statement = `INSERT INTO voteOption(userId, voteId, optionId) VALUES(?, ?, ?)`;
    const [result] = await db.execute(statement, [userId, voteId, optionId]);
    return result;
  }

  async deleteOption(userId: number, voteId: number, optionId: number) {
    const statement = `DELETE FROM voteOption WHERE userId = ? AND voteId = ? AND optionId = ?`;
    const [result] = await db.execute(statement, [userId, voteId, optionId]);
    return result;
  }

  async updateOption(userId: number, voteId: number, optionId: number) {
    const statement = `UPDATE voteOption SET optionId = ? WHERE userId = ? AND voteId = ? AND optionId != ?`;
    const [result] = await db.execute(statement, [
      optionId,
      userId,
      voteId,
      optionId,
    ]);
    return result;
  }
}

export const voteService = new VoteService();
