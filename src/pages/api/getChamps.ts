// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { championsJSON } from "../../types/champions";
import { generateRandomNumber } from "../../utils/generateRandomNumber";
import { getChampionsJSON } from "../../utils/getChampionsJSON";

type Data = {
    ok: Boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const data = JSON.parse(getChampionsJSON());

    for (let champ in data) {
        const champObj = data[champ];
        const imagesLength = champObj.imagesURLs.length - 1;
        data[champ].imagesURLs = [
            data[champ].imagesURLs[generateRandomNumber(0, imagesLength)],
        ];
    }

    res.status(200).json(data);
}
