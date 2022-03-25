import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { useAllRoutes } from "../router/index";
import { errorHandler } from "./error-handler";

export const app: Koa = new Koa();

app.use(bodyParser());

useAllRoutes.call(app);

app.on("error", errorHandler);
