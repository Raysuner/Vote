import env from "dotenv"
import fs from "fs"
import path from "path"

export const PRIVATE_KEY: Buffer = fs.readFileSync(path.resolve(__dirname, "keys/private.key"))
export const PUBLIC_KEY: Buffer = fs.readFileSync(path.resolve(__dirname, "keys/public.key"))

env.config()

export const APP_PORT: string = process.env.APP_POST
export const MYSQL_HOST: string = process.env.MYSQL_HOST
export const MYSQL_PORT: string = process.env.MYSQL_PORT
export const MYSQL_USER: string = process.env.MYSQL_USER
export const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD
export const MYSQL_DATABASE: string = process.env.MYSQL_DATABASE
export const MYSQL_LIMIT: string = process.env.MYSQL_LIMIT