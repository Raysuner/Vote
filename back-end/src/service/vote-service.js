const database = require("../app/database")

class voteService {
  async createVote(voteInfo, user_id) {
    const voteStatement = `INSERT INTO
      vote(user_id, title, descr, deadline, anony, multiple)
      VALUES(?, ?, ?, ?, ?, ?)
    `
    const optionStatement = `INSERT INTO opt(vote_id, content) VALUES(?, ?)`

    const info = [user_id].concat(Object.values(voteInfo))
    const options = info.pop()

    const [result] = await database.execute(voteStatement, info)
    const vote_id = result.insertId

    for (const option of options) {
      await database.execute(optionStatement, [vote_id, option])
    }
    return result
  }

  async getVoteByName(user_id) {
    const statement = `SELECT * FROM vote WHERE user_id = ?`
    const result = await database.execute(statement, [user_id])
    return result
  }

  async getVoteInfo(vote_id) {
    const statement = `SELECT title, multiple, anony FROM vote WHERE id = ?`
    const result = await database.execute(statement, [vote_id])
    return result
  }

  async getVoteOptions(vote_id) {
    const statement = `SELECT * FROM opt WHERE vote_id = ?`
    const result = await database.execute(statement, [vote_id])
    return result
  }

  async isVotedOption(user_id, vote_id, option_id) {
    const statement = `SELECT * FROM voteOption WHERE user_id = ? AND vote_id = ? AND option_id = ?`
    const result = await database.execute(statement, [user_id, vote_id, option_id])
    return result
  }

  async addOption(user_id, vote_id, option_id) {
    const statement = `INSERT INTO voteOption(user_id, vote_id, option_id) VALUES(?, ?, ?)`
    const result = await database.execute(statement, [user_id, vote_id, option_id])
    return result
  }

  async deleteOption(user_id, vote_id, option_id) {
    const statement = `DELETE FROM voteOption WHERE user_id = ? AND vote_id = ? AND option_id = ?`
    const result = await database.execute(statement, [user_id, vote_id, option_id])
    return result
  }

  async deleteReverseOption(user_id, vote_id, option_id) {
    const statement = `DELETE FROM voteOption WHERE user_id = ? AND vote_id = ? AND option_id != ?`
    const result = await database.execute(statement, [user_id, vote_id, option_id])
    return result
  }
}

module.exports = new voteService()