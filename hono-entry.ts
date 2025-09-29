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

    const { DB } = c.env; // Destructure your D1 binding from c.env

      if (!DB) {
        return c.text('D1 binding not found', 500);
      }
    try {
      const { results } = await c.env.DB.prepare(
        "SELECT * FROM article"
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
