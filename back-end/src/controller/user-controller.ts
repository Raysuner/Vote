import { Context } from "koa";
import { User } from "../common/interface";
import { userService } from "../service/user-service";
import { DATABASE_ERROR } from "../app/error-types";

class UserController {
  async createUser(ctx: Context, next: () => Promise<any>) {
    const user: User = ctx.request.body;
    const result = await userService.createUser(user);
    if (!result) {
      const error: Error = new Error(DATABASE_ERROR);
      return ctx.app.emit("error", error, ctx);
    }
    ctx.body = "注册成功";
  }
}

export const userController = new UserController();
