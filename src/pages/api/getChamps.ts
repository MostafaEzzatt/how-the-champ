// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { generateRandomNumber } from "../../utils/generateRandomNumber";
import { readFile } from "../../utils/readFile";

type Data = {
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const champions = readFile("champions.json") || false;
    const data = champions ? JSON.parse(champions) : false;

    if (data) {
        for (let champ in data) {
            const champObj = data[champ];
            const imagesLength = champObj.imagesURLs.length - 1;
            data[champ].imagesURLs = [
                data[champ].imagesURLs[generateRandomNumber(0, imagesLength)],
            ];
        }

        return res.status(200).json(data);
    }
    return res.status(500).json({ error: "champions cant found" });
}
