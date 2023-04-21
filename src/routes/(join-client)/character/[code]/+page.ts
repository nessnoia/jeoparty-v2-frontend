import { animalToActivities } from '$lib/selector-maps';
import type { PageLoad } from './$types';
 
export const load = (({ params }) => {
    let ranIndexes = getTwoRandomIndexes(3, animalToActivities['elephant'].length);
    return {
        code: params.code,
        indexes: ranIndexes,
    };
}) satisfies PageLoad;

const getTwoRandomIndexes = (min: number, max: number): Set<number> => {
    let indexes = new Set<number>();
    return generateTwoRandomUniqueIndexes(indexes, min, max);
}

const generateTwoRandomUniqueIndexes = (
    indexes: Set<number>,
    min: number,
    max: number
): Set<number>  => {
    let index = Math.floor(Math.random() * (max - min) + min);
    if (indexes.size == 2) {
        return indexes;
    }
    if (!indexes.has(index)) {
        indexes.add(index);
    }
    return generateTwoRandomUniqueIndexes(indexes, min, max);
}