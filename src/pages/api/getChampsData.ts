// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getChampionsData } from "../../utils/getChampionsData";
import { saveFile } from "../../utils/saveFile";

type Data = {
    ok: Boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const data = await getChampionsData();
    saveFile(data, "champions.json");
    res.status(200).json({ ok: true });
}
