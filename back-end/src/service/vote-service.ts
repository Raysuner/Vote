import {db} from "../app/database"

class VoteService {
  async createVote(voteInfo: Object, user_id: number) {
    const voteStatement: string = `INSERT INTO
      vote(user_id, title, descr, deadline, anony, multiple)
      VALUES(?, ?, ?, ?, ?, ?)
    `
    const optionStatement: string = `INSERT INTO opt(vote_id, content) VALUES(?, ?)`

    const info = [user_id].concat(Object.values(voteInfo))
    const options = info.pop()

    const [result] = await db.execute(voteStatement, info)
    // @ts-ignore
    const vote_id = result.insertId

    // @ts-ignore
    for (const option of options) {
      await db.execute(optionStatement, [vote_id, option])
    }
    return result
  }

  async getVote(user_id: number) {
    const statement = `SELECT * FROM vote WHERE user_id = ?`
    const result = await db.execute(statement, [user_id])
    return result
  }

  //用户为当前投票的投票情况
  async getVoteStatus(vote_id: number) {
    const statement = `
      SELECT voteoption.id, user_id, option_id, avatar FROM voteoption JOIN user on user.id = voteoption.user_id WHERE vote_id = ?
    `
    const result = await db.execute(statement, [vote_id])
    return result
  }

  //获取单个投票信息
  async getVoteInfo(vote_id: number) {
    const statement = `SELECT title, multiple, anony, deadline FROM vote WHERE id = ?`
    const [result] = await db.execute(statement, [vote_id])
    return result
  }

  //获取单个投票所有投票选项
  async getVoteOptions(vote_id: number) {
    const statement = `SELECT id, vote_id, content FROM opt WHERE vote_id = ?`
    const result = await db.execute(statement, [vote_id])
    return result
  }

  async isVotedMultiple(user_id: number, vote_id: number, option_id: number) {
    const statement = `SELECT * FROM voteOption WHERE user_id = ? AND vote_id = ? AND option_id = ?`
    const [result] = await db.execute(statement, [user_id, vote_id, option_id])
    return result
  }

  async isVotedSingle(user_id: number, vote_id: number) {
    const statement = `SELECT * FROM voteOption WHERE user_id = ? AND vote_id = ?`
    const [result] = await db.execute(statement, [user_id, vote_id])
    return result
  }

  async addOption(user_id: number, vote_id: number, option_id: number) {
    const statement = `INSERT INTO voteOption(user_id, vote_id, option_id) VALUES(?, ?, ?)`
    const [result] = await db.execute(statement, [user_id, vote_id, option_id])
    return result
  }

  async deleteOption(user_id: number, vote_id: number, option_id: number) {
    const statement = `DELETE FROM voteOption WHERE user_id = ? AND vote_id = ? AND option_id = ?`
    const [result] = await db.execute(statement, [user_id, vote_id, option_id])
    return result
  }

  async updateOption(user_id: number, vote_id: number, option_id: number) {
    const statement = `UPDATE voteOption SET option_id = ? WHERE user_id = ? AND vote_id = ? AND option_id != ?`
    const [result] = await db.execute(statement, [option_id, user_id, vote_id, option_id])
    return result
  }
}

export const voteService = new VoteService()