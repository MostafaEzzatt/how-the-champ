// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllChampions } from "../../utils/getChampionsData";
import { saveFile } from "../../utils/saveFile";

type Data = {
    ok: Boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const data = await getAllChampions();
    let ChampsList = [];

    for (let champ in data.data) {
        ChampsList.push(champ);
    }

    saveFile({ champions: ChampsList }, "championsList.json");

    res.status(200).json({
        ok: true,
    });
}
