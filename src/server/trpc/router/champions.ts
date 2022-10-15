import { generateRandomNumber } from "../../../utils/generateRandomNumber";
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
