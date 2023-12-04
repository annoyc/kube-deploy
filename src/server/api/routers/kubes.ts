import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const kubesRouter = createTRPCRouter({
  queryList: publicProcedure
    .input(z.object({ url: z.string(), path: z.string(), token: z.string() }))
    .query(async ({ input }) => {
      const kubesApiRes = await fetch(input.url + input.path, {
        headers: new Headers({
          Authorization: `Bearer ${input.token}`,
        }),
      });
      // perhaps some error handling
      if (!kubesApiRes.ok) {
        throw new TRPCError({
          message: "请求外部接口出错",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return (await kubesApiRes.json()) as unknown;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.servers.delete({
        where: { id: input.id },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.servers.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getItemById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.servers.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
