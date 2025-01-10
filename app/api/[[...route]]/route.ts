import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts/accounts";
import organizations from "./organizations/organizations";
import { HTTPException } from "hono/http-exception";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "Internal Server Error!" }, 500);
});

const accountsRoute = app.route("/accounts", accounts);
const organizationsRoute = app.route("/organizations", organizations);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export type AppType = typeof accountsRoute & typeof organizationsRoute;
