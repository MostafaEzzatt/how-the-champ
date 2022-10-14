// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { saveChampionsJSON } from "../../utils/createChampionJSON";
import { getChampionsData } from "../../utils/getChampionsData";

type Data = {
    ok: Boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const data = await getChampionsData();
    saveChampionsJSON(data);
    res.status(200).json({ ok: true });
}
