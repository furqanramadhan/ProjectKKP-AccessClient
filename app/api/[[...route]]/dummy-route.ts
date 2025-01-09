// import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";
// import { z } from 'zod'
// import test from 'node:test';
import authors from "./authors";
import books from "./books";
import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "Internal Server Error!" }, 500);
});

const routes = app
  .route("/accounts", accounts)
  .route("authors", authors)
  .route("/books", books);

// app
//   .get(
//     '/hello',
//     clerkMiddleware(),
//     (c) => {
//         const auth = getAuth(c)

//         if (!auth?.userId){
//             return c.json({error: "Unauthorized 403!"})
//         }
//     return c.json({
//       message: 'Hello Next.js!',
//       userId: auth.userId
//     })
//   })

//   .get(
//     '/hello/:test',
//     (c) => {
//     return c.json({
//         message: "Hello World!",
//         test: test,
//     })
//   })

//   .post(
//     '/create:postId',
//     zValidator('json', z.object({
//         name: z.string(),
//         userId: z.number()
//     })),
//     zValidator('param', z.object({
//         postId: z.number()
//     })),
//     (c) => {
//         const { name, userId } = c.req.valid("json")
//         const { postId } = c.req.valid("param")

//     return c.json({})
//   })

export const GET = handle(app);
export const POST = handle(app);
export type AppType = typeof routes;

// export const GET = () => {
//     return NextResponse.json({})
// }
