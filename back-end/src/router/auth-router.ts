import Router from "koa-router";
import { authController } from "../controller/auth-controller";
import { verifyAuth, verifyLogin } from "../middleware/auth-middleware";

export const router: Router = new Router({ prefix: "/api" });

router.post("/login", verifyLogin, authController.login);

router.get("/login-user", verifyAuth, authController.getLoginUser);
