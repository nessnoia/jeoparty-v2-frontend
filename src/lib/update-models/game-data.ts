export const generateId = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export interface GameDataUpdater {
	gameTitle?: string;
    updates?: (RoundUpdater | CategoryUpdater | ClueUpdater)[];
}

export interface Updater {
    id?: string;
    add?: boolean;
    delete?: boolean;
}

export const isRoundUpdate = (update: any): update is RoundUpdater => {
    let roundUpdate = <RoundUpdater>update;
    return (roundUpdate.id || '').includes('round');
}

export const isCategoryUpdate = (update: any): update is CategoryUpdater => {
    let categoryUpdate = <CategoryUpdater>update;
    return (categoryUpdate.id || '').includes('category');
}

export const isClueUpdate = (update: any): update is ClueUpdater => {
    let clueUpdate = <ClueUpdater>update;
    return (clueUpdate.id || '').includes('clue');
}

export interface RoundUpdater extends Updater {
    num?: number;
    title?: string;
    type?: string;
    numDailyDoubles?: number;
    maxDailyDoubles?: number;
    categories?: CategoryUpdater[];
}

export interface CategoryUpdater extends Updater {
    roundId?: string;
    category?: string;
    clues?: ClueUpdater[];
}

export interface ClueUpdater extends Updater{
    roundId?: string;
    categoryId?: string;
    value?: number;
    clue?: string;
    clueImage?: string;
    answer?: string;
    isDailyDouble?: boolean;
}

export const sortClues = (c1: ClueUpdater, c2: ClueUpdater) => {
    let c1Value = c1.value ?? 0;
    let c2Value = c2.value ?? 0;
    if (c1Value < c2Value) return -1;
    else if (c1Value > c2Value) return 1;
    else return 0;
}