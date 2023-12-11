/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import type { InstalledPackageDetail } from "~/lib/types";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const kubesRouter = createTRPCRouter({
  deploy: publicProcedure
    .input(
      z.object({
        url: z.string(),
        path: z.string(),
        token: z.string(),
        data: z.any(),
      }),
    )
    .mutation(async ({ input }) => {
      if (input.data.valuesApplied) delete input.data.valuesApplied;
      if (input.data.postInstallationNotes)
        delete input.data.postInstallationNotes;
      const kubesApiRes = await fetch(input.url + input.path, {
        method: "PUT",
        body: JSON.stringify(input.data),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${input.token}`,
        }),
      });

      // perhaps some error handling
      if (!kubesApiRes.ok) {
        const fetchError = await kubesApiRes.text();
        throw new TRPCError({
          message: fetchError,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await kubesApiRes.json();
    }),

  queryDetail: publicProcedure
    .input(z.object({ url: z.string(), path: z.string(), token: z.string() }))
    .query(async ({ input }) => {
      const kubesApiRes = await fetch(input.url + input.path, {
        headers: new Headers({
          Authorization: `Bearer ${input.token}`,
        }),
      });
      if (!kubesApiRes.ok) {
        const fetchError = await kubesApiRes.text();
        throw new TRPCError({
          message: fetchError,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return (await kubesApiRes.json()) as InstalledPackageDetail;
    }),

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
        const fetchError = await kubesApiRes.text();
        throw new TRPCError({
          message: fetchError,
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return (await kubesApiRes.json()) as unknown;
    }),
});
