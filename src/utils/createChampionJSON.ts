const fs = require("fs");

export const saveChampionsJSON = (data: Object) => {
    fs.mkdirSync("data");
    fs.writeFileSync("data/champions.json", JSON.stringify(data, null, 4));
};
