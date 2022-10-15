import * as fs from "fs";

export const readFile = (fileName: string) => {
    return fs.readFileSync(`data/${fileName}`, "utf8");
};
