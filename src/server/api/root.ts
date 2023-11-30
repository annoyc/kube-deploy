import { postRouter } from "~/server/api/routers/post";
import { serversRouter } from "~/server/api/routers/servers";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  serversRouter: serversRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
