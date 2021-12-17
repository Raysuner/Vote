import { db } from "../app/database"
import { User } from "../common/interface"

class UserService  {
    async createUser(user: User) {
        const {name, password}: User = user
        const statement: string = `INSERT INTO user(name, password) VALUES(?, ?)`
        const [result] = await db.execute(statement, [name, password])
        return result
    }

    async getUserByName(name: string) {
        const statement: string = `SELECT id, name, password, avatar FROM user WHERE name = ?;`
        const [result] = await db.execute(statement, [name])
        return result
    }
}

export const userService = new UserService()