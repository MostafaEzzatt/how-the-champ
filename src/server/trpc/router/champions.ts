import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { trpc } from "../../../utils/trpc";
import { publicProcedure, router } from "../trpc";

export const championsRouter = router({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.champions.findMany();
    }),
});
