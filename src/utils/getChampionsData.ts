import { SingleChampion } from "../types/ChampionRequestType";

export const generateSplashArtURL = (name: string) => {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}.jpg`;
};

export const getChampionData = async (name: string) => {
    const response = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion/${name}.json`
    );

    return await response.json();
};

export const getAllChampions = async () => {
    const response = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion.json"
    );

    return await response.json();
};

export const getChampionsData = async () => {
    const champions = await getAllChampions();
    let data: {
        [key: string]: any;
    } = {};

    for (let name in champions.data) {
        const champResponse = (await getChampionData(name)) as SingleChampion;
        const champData = champResponse.data[name];

        data[name] = {
            name,
            blurb: champData.blurb,
            imagesURLs: champData.skins.map((s) =>
                generateSplashArtURL(`${name}_${s.num}`)
            ),
            spells: champData.spells.map((s) => s.name),
            tags: champData.tags,
        };
    }

    return data;
};
