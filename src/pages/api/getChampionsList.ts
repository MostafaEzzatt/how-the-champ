// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import { getChampionsData } from "../../utils/getChampionsData";

const getChampionsList = async (req: NextApiRequest, res: NextApiResponse) => {
    const champions = await getChampionsData();
    const championsArray = Object.entries(champions).map((e) => ({ ...e[1] }));

    // reset Table
    await prisma.champions.deleteMany({});

    // add champions list to the db
    await prisma.champions.createMany({
        data: championsArray,
    });
    return res.status(500).json({ done: true });
};

export default getChampionsList;
