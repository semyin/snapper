// TODO: stop using universal-middleware and directly integrate server middlewares instead and/or use vike-server https://vike.dev/vike-server. (Bati generates boilerplates that use universal-middleware https://github.com/magne4000/universal-middleware to make Bati's internal logic easier. This is temporary and will be removed soon.)

import type { dbD1 } from "../database/drizzle/db";
import * as drizzleQueries from "../database/drizzle/queries/todos";
import type { Get, UniversalHandler } from "@universal-middleware/core";

export const createTodoHandler: Get<[], UniversalHandler<Universal.Context & { db: ReturnType<typeof dbD1> }>> =
  () => async (request, _context, _runtime) => {
    // In a real case, user-provided data should ALWAYS be validated with tools like zod
    const newTodo = (await request.json()) as { text: string };

    await drizzleQueries.insertTodo(_context.db, newTodo.text);

    return new Response(JSON.stringify({ status: "OK" }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  };
