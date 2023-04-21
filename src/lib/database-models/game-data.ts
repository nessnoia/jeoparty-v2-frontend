import type * as mongodb from "mongodb";

export interface GameData {
    _id?: mongodb.ObjectId;
	gameTitle?: string;
	rounds: Round[];
}

export interface Round {
    id: string;
    num: number;
    title: string;
    type: string;
    maxDailyDoubles?: number;
    categories: Category[];
}

export interface Category {
    id: string;
    category: string;
    clues: Clue[];
}

export interface Clue {
    id: string;
    value?: number;
    clue: string;
    clueImage?: string;
    answer: string;
    isDailyDouble?: boolean;
}

export const sortClues = (c1: Clue, c2: Clue) => {
    let c1Value = c1.value ?? 0;
    let c2Value = c2.value ?? 0;
    if (c1Value < c2Value) return -1;
    else if (c1Value > c2Value) return 1;
    else return 0;
}
