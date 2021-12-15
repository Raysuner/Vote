
import mysql from "mysql2"
import { Pool } from "mysql2/promise"
import * as config from "./config"

const database: mysql.Pool = mysql.createPool({
    host: config.MYSQL_HOST,
    port: +config.MYSQL_PORT,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    connectionLimit: +config.MYSQL_LIMIT
})

export const db: Pool = database.promise()