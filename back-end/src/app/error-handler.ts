import { BaseContext } from "koa";
import * as errorType from "./error-types";

export function errorHandler(error: Error, ctx: BaseContext) {
  let status: number, message: Object;
  switch (error.message) {
    case errorType.USERNAME_AND_PASSWORD_IS_REQUIRED:
      status = 400;
      message = { errorMsg: "账号或密码未填写" };
      break;
    case errorType.USER_NOT_EXIST:
      status = 400;
      message = { errorMsg: "用户不存在" };
      break;
    case errorType.PASSWORD_IS_NOT_CORRECT:
      status = 400;
      message = { errorMsg: "密码不正确" };
      break;
    case errorType.CAN_NOT_GET_CORRECT_PARAMS:
      status = 400;
      message = { errorMsg: "参数不正确" };
      break;
    case errorType.UNAUTHORIZATION:
      status = 401;
      message = { errorMsg: "未授权" };
      break;
    case errorType.UNPERMISSION:
      status = 401;
      message = { errorMsg: "你没有这个权限" };
      break;
    case errorType.USER_ALREADY_EXIST:
      status = 409;
      message = { errorMsg: "用户已经存在" };
      break;
    case errorType.DATABASE_ERROR:
      status = 500;
      message = { errorMsg: "数据库出错" };
      break;
    case errorType.UPDATA_COMMENT_FAILED:
      status = 500;
      message = { errorMsg: "更新评论错误" };
      break;
    case errorType.DEADLINE_PASSED:
      status = 403;
      message = { errorMsg: "已过截止日期" };
      break;
    default:
      status = 404;
      message = { errorMsg: "默认错误" };
  }
  ctx.status = status;
  ctx.body = message;
}
