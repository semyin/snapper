import "dotenv/config";
import { D1Database } from '@cloudflare/workers-types'
import { apply } from "vike-cloudflare/hono";
import { serve } from "vike-cloudflare/hono/serve";
import { Hono } from "hono";

type Bindings = {
  DB: D1Database
}

function startServer() {
  
  const app = new Hono<{ Bindings: Bindings }>();

  app.get('/api/users', async (c) => {
    try {
      const { results } = await c.env.DB.prepare(
        "SELECT * FROM users"
      ).all();
      return c.json(results);
    } catch (e) {
      console.error(e);
      return c.json({ err: e }, 500);
    }
  })

  app.get('/api/abc', (c) => {
    return c.json({
      message: 'hello world',
    })
  })

  apply(app);

  return serve(app, { port: 3000 });
}

export default startServer();
