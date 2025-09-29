import { getDbFromRuntime } from "../database/d1/helpers";
import { dbD1 } from "../database/drizzle/db";
import type { Get, UniversalMiddleware } from "@universal-middleware/core";

declare global {
  namespace Universal {
    interface Context {
      db: ReturnType<typeof dbD1>;
    }
  }
}

// Add `db` to the Context
export const dbMiddleware: Get<[], UniversalMiddleware> = () => async (_request, context, _runtime) => {
  const db = dbD1(await getDbFromRuntime(_runtime));

  return {
    ...context,
    db: db,
  };
};
