export interface Player {
    name: string;
    character: string;
    characterColour: number;
    score: number;
    place: number;
}

export interface PlayerFinalJeoparty {
    name?: string;
    wager: number;
    answer: string;
}