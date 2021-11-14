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

  async getVoteByVoteId(vote_id) {
    const statement1 = `SELECT title, anony FROM vote WHERE id = ?`
    const statement2 = `SELECT * FROM opt WHERE vote_id = ?`

    let [result1] = await database.execute(statement1, [vote_id])
    let [result2] = await database.execute(statement2, [vote_id])
    return result1.concat(result2)
  }
}

module.exports = new voteService()