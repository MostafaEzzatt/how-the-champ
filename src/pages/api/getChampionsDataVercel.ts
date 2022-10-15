// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Champion, SingleChampion } from "../../types/ChampionRequestType";
import {
    generateSplashArtURL,
    getChampionData,
} from "../../utils/getChampionsData";
import { readFile } from "../../utils/readFile";
import { saveFile } from "../../utils/saveFile";

type Data = {
    ok?: Boolean;
    error?: string;
};

type championsList = {
    champions: string[];
} | null;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const id = req.query.id;

    if (!id) return res.status(400).json({ error: "id is require" });

    // ChampionsList
    const championsList = readFile("championsList.json") || false;
    const data = championsList
        ? JSON.parse(championsList)
        : (null as Champion | null);

    // Current Fetched Champions

    const champions = readFile("champions.json") || false;
    const championsJSON = champions
        ? JSON.parse(champions)
        : (null as Champion | null);

    console.log(data.champions.length);

    // check if all champions fetched
    if (id >= data.champions.length) {
        return res.status(200).json({ error: "all champions fetched" });
    }

    if (data) {
        const theChampion = (await getChampionData(
            data.champions[+id]
        )) as SingleChampion;

        const champObject = theChampion.data[Object.keys(theChampion.data)[0]];
        const champJSONObj = {
            name: champObject.name,
            blurb: champObject.blurb,
            imagesURLs: champObject.skins.map((s) =>
                generateSplashArtURL(`${champObject.name}_${s.num}`)
            ),
            spells: champObject.spells.map((s) => s.name),
            tags: champObject.tags,
        };

        if (!champions) {
            saveFile(
                {
                    [Object.keys(theChampion.data)[0]]: champJSONObj,
                },
                "champions.json"
            );
        } else {
            championsJSON[champJSONObj.name] = champJSONObj;
            saveFile(championsJSON, "champions.json");
        }

        return res
            .status(200)
            .redirect(`/api/getChampionsDataVercel?id=${+id + 1}`);
    }

    return res.status(500).json({ error: "champion list not found" });
}
