import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { generateRandomNumber } from "../../../utils/generateRandomNumber";
import { generateSplashArtURL } from "../../../utils/getChampionsData";
import { trpc } from "../../../utils/trpc";
import { publicProcedure, router } from "../trpc";

export const championsRouter = router({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const champions = await ctx.prisma.champions.findMany();
        return champions.map((champ) => {
            const randomImageIndex = generateRandomNumber(
                0,
                champ.imagesURLs.length - 1
            );

            return {
                ...champ,
                imagesURLs: champ.imagesURLs.filter(
                    (img, idx) => idx == randomImageIndex
                ),
            };
        });
    }),
});
