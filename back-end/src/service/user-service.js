const database = require("../app/database")

class UserService  {
    async createUser(user) {
        const {name, password} = user
        const statement = `INSERT INTO user(name, password) VALUES(?, ?)`
        const result = await database.execute(statement, [name, password])

        return result[0]
    }

    async getUserByName(name) {
        const statement = `SELECT id, name, avatar, password FROM user WHERE name = ?;`
        const result = await database.execute(statement, [name])

        return result[0]
    }

}

module.exports = new UserService()