import { dbD1 } from "./database/drizzle/db";
import type { D1Database } from "@cloudflare/workers-types";

// Cloudflare typings
interface Env {
  DB: D1Database;
}

declare global {
  namespace Vike {
    interface PageContext {
      env: Env;
    }
  }
}

declare global {
  namespace Vike {
    interface PageContext {
      db: ReturnType<typeof dbD1>;
    }
  }
}
