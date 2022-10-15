// src/server/router/_app.ts
import { router } from "../trpc";
import { championsRouter } from "./champions";

import { exampleRouter } from "./example";

export const appRouter = router({
    example: exampleRouter,
    champions: championsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
