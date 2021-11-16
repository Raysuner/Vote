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

  async getVote(user_id) {
    const statement = `SELECT * FROM vote`
    const result = await database.execute(statement, [])
    return result
  }

  async getVotedUsers(vote_id) {
    const statement = `SELECT id, name FROM user WHERE id in(SELECT user_id FROM voteOption WHERE vote_id = ?)`
    const result = await database.execute(statement, [vote_id])
    return result
  }

  async getVoteStatus(vote_id) {
    const statement = `SELECT * FROM voteOption WHERE vote_id = ?`
    const result = await database.execute(statement, [vote_id])
    return result
  }

  async getVoteInfo(vote_id) {
    const statement = `SELECT title, multiple, anony, deadline FROM vote WHERE id = ?`
    const result = await database.execute(statement, [vote_id])
    return result
  }

  async getVoteOptions(vote_id) {
    const statement = `SELECT * FROM opt WHERE vote_id = ?`
    const result = await database.execute(statement, [vote_id])
    return result
  }

  async isVotedMultiple(user_id, vote_id, option_id) {
    const statement = `SELECT * FROM voteOption WHERE user_id = ? AND vote_id = ? AND option_id = ?`
    const result = await database.execute(statement, [user_id, vote_id, option_id])
    return result
  }

  async isVotedSingle(user_id, vote_id) {
    const statement = `SELECT * FROM voteOption WHERE user_id = ? AND vote_id = ?`
    const result = await database.execute(statement, [user_id, vote_id])
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

  async updateOption(user_id, vote_id, option_id) {
    const statement = `UPDATE voteOption SET option_id = ? WHERE user_id = ? AND vote_id = ? AND option_id != ?`
    const result = await database.execute(statement, [option_id, user_id, vote_id, option_id])
    return result
  }
}

module.exports = new voteService()