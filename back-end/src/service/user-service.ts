import { db } from "../app/database"

class UserService  {
    async createUser(user) {
        const {name, password}: {name: String, password: string} = user
        const statement: string = `INSERT INTO user(name, password) VALUES(?, ?)`
        const [result] = await db.execute(statement, [name, password])
        return result
    }

    async getUserByName(name) {
        const statement = `SELECT id, name, avatar, password FROM user WHERE name = ?;`
        const [result] = await db.execute(statement, [name])
        return result
    }
}

export const userService: UserService = new UserService()