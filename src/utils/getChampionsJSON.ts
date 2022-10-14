import * as fs from "fs";
export const getChampionsJSON = () => {
    return fs.readFileSync("data/champions.json", "utf8");
};
