import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const serversRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.servers.delete({
        where: { id: input.id },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        protocal: z.string(),
        domain: z.string(),
        port: z.string(),
        remark: z.string(),
        kubeToken: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.servers.create({
        data: {
          name: input.name,
          protocal: input.protocal,
          domain: input.domain,
          port: input.port || "443",
          remark: input.remark || "",
          kubeToken: input.kubeToken,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        protocal: z.string(),
        domain: z.string(),
        port: z.string(),
        remark: z.string(),
        kubeToken: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.servers.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          protocal: input.protocal,
          domain: input.domain,
          port: input.port || "443",
          remark: input.remark || "",
          kubeToken: input.kubeToken,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
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
