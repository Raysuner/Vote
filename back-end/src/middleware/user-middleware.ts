import { Context } from "koa";

import {
  USERNAME_AND_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXIST
} from "../app/error-types";
import { userService } from "../service/user-service";
import { encryptionPassword } from "../utils/encryption";

export const verifyUser = async (ctx: Context, next: () => Promise<any>) => {
    const { name, password } = ctx.request.body

    if (!name || !password) {
        const error: Error = new Error(USERNAME_AND_PASSWORD_IS_REQUIRED)
        return ctx.app.emit("error", error, ctx)
    }

    const result = await userService.getUserByName(name)
    // @ts-ignore
    if (result.length) {
        const error = new Error(USER_ALREADY_EXIST)
        return ctx.app.emit("error", error, ctx)
    }
    await next()
}

export const handlePassword = async (ctx: Context, next: () => Promise<any>) => {
    let {password} = ctx.request.body
    password = encryptionPassword(password)
    ctx.request.body.password = password
    await next()
}