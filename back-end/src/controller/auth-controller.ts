import jwt from "jsonwebtoken";
import { Context } from "koa";
import { PRIVATE_KEY } from "../app/config";

class AuthController {
  async login(ctx: Context, next: () => Promise<any>) {
    const { id, name, avatar } = ctx.user;
    const token = jwt.sign({ id, name, avatar }, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 60 * 60 * 24 * 1,
    });
    ctx.body = { id, name, token };
  }

  async getLoginUser(ctx: Context, next: () => Promise<any>) {
    const user = ctx.user;
    ctx.body = user;
  }
}

export const authController = new AuthController();
