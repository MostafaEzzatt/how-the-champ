export interface Champion {
    blurb: string;
    imagesURLs: string[];
    name: string;
    spells: string[];
    tags: string[];
}
export interface championsJSON {
    [key: string]: Champion;
}
