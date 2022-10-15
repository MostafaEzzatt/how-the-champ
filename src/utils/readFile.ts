import * as fs from "fs";

export const readFile = (fileName: string) => {
    if (fs.existsSync(`data/${fileName}`)) {
        return fs.readFileSync(`data/${fileName}`, "utf8");
    }

    return null;
};
