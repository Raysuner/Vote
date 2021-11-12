const database = require("../app/database")

class AuthService {
    async checkPermission(userId, commentId) {
        const statement = `SELECT user_id from comment where id = ?`
        try {
            const [result] = await database.execute(statement, [commentId])
            const id = result[0].user_id
            return id === userId
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new AuthService()