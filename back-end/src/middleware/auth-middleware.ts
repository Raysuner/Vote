import { Context } from "koa"

import jwt from "jsonwebtoken"

import {
  USERNAME_AND_PASSWORD_IS_REQUIRED,
  USER_NOT_EXIST,
  PASSWORD_IS_NOT_CORRECT,
  UNAUTHORIZATION,
  DATABASE_ERROR
} from "../app/error-types"
import { userService } from "../service/user-service"
import { PUBLIC_KEY } from "../app/config"
import encryption from "../utils/encryption"

export const verifyLogin = async (ctx: Context, next: () => Promise<any>) => {
  const { name, password }: {name: string, password: string} = ctx.request.body

  if (!name || !password) {
    const error: Error = new Error(USERNAME_AND_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error", error, ctx)
  }

  const result = await userService.getUserByName(name)
  const user = result[0]
  if (!user) {
    const error = new Error(USER_NOT_EXIST)
    return ctx.app.emit("error", error, ctx)
  }

  if (encryption.encryptionPassword(password) !== user.password) {
    const error = new Error(PASSWORD_IS_NOT_CORRECT)
    return ctx.app.emit("error", error, ctx)
  }

  ctx.user = user

  await next()
}

export const verifyAuth = async (ctx: Context, next: () => Promise<any>) => {
  try {
    // 获取token
    const authorization: string = ctx.headers.authorization
    if (!authorization || authorization === "Bearer") {
      const error: Error = new Error(UNAUTHORIZATION)
      return ctx.app.emit("error", error, ctx)
    }
    const token: string = authorization.replace("Bearer ", "")

    // 验证token
    const result: Object = jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] })
    // console.log("verify token result: ", result)

    if (!result) {
      const error: Error = new Error(UNAUTHORIZATION)
      ctx.app.emit("error", error, ctx)
    }
    else {
      ctx.user = result
      await next()
    }
  } catch (err) {
    if (err.sqlMessage) {
      console.log("sqlMessage: ", err.sqlMessage)
      const error: Error = new Error(DATABASE_ERROR)
      ctx.app.emit("error", error, ctx)
    }
    else {
      throw err
    }
  }
}