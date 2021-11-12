const mysql = require("mysql2")
const config = require("./config")

const database = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    connectionLimit: config.MYSQL_LIMIT
})

module.exports = database.promise()