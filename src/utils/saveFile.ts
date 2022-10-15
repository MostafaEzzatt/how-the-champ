const fs = require("fs");

export const saveFile = (data: Object, fileName: string) => {
    fs.mkdirSync("data");
    fs.writeFileSync(`data/${fileName}`, JSON.stringify(data, null, 4));
};
