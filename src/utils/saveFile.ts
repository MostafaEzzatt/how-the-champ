import * as fs from "fs";

export const saveFile = (data: Object, fileName: string) => {
    if (!fs.existsSync("data")) {
        fs.mkdirSync("data");
    }
    fs.writeFileSync(`data/${fileName}`, JSON.stringify(data, null, 4));
};
