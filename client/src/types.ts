export type KeriaData = {
    champion: String,
    win: String,
    loose: String,
    kda: String,
}

export type ChampionData = {
    [key: string]: {
        name: String,
        image: {
            full: string,
            x: number,
            y: number,
            w: number,
            h: number,
        }
    }
}