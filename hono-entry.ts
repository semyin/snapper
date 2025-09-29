import "dotenv/config";
import { dbMiddleware } from "./server/db-middleware";
import { createTodoHandler } from "./server/create-todo-handler";
import { vikeHandler } from "./server/vike-handler";
import { createHandler, createMiddleware } from "@universal-middleware/hono";
import { Hono } from "hono";

const app = new Hono();

app.use(createMiddleware(dbMiddleware)());

app.post("/api/todo/create", createHandler(createTodoHandler)());

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all("*", createHandler(vikeHandler)());

export default app;
