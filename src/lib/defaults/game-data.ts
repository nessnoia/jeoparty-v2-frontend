import type { GameData, Round } from "$lib/database-models/game-data";
import { generateId } from "$lib/update-models/game-data";
// import { v4 as uuid } from 'uuid';

export const generateCustomGameData = () => {
    return <GameData>{ 
        rounds: [{
            id: `round-${generateId(10)}`,
            num: 1,
            title: 'Round 1',
            type: 'normal',
            categories: [{
                id: `category-${generateId(10)}`,
                category: 'Category',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 0,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }]
	    }]
    }
};

export const generateNormalGameData = () => {
    return <GameData>{
        rounds: [{
            id: `round-${generateId(10)}`,
            num: 1,
            title: 'Round 1',
            type: 'normal',
            maxDailyDoubles: 1,
            categories: [{
                id: `category-${generateId(10)}`,
                category: 'Category 1',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 200,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 400,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 600,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 800,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1000,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }, {
                id: `category-${generateId(10)}`,
                category: 'Category 2',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 200,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 400,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 600,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 800,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1000,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }, {
                id: `category-${generateId(10)}`,
                category: 'Category 3',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 200,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 400,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 600,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 800,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1000,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }, {
                id: `category-${generateId(10)}`,
                category: 'Category 4',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 200,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 400,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 600,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 800,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1000,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }, {
                id: `category-${generateId(10)}`,
                category: 'Category 5',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 200,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 400,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 600,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 800,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1000,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }, {
                id: `category-${generateId(10)}`,
                category: 'Category 6',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 200,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 400,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 600,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 800,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1000,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }]
        }, {
            id: `round-${generateId(10)}`,
            num: 2,
            title: 'Round 2',
            type: 'normal',
            maxDailyDoubles: 2,
            categories: [{
                id: `category-${generateId(10)}`,
                category: 'Category 1',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 400,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 800,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1200,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1600,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 2000,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }, {
                id: `category-${generateId(10)}`,
                category: 'Category 2',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 400,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 800,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1200,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1600,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 2000,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }, {
                id: `category-${generateId(10)}`,
                category: 'Category 3',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 400,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 800,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1200,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1600,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 2000,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }, {
                id: `category-${generateId(10)}`,
                category: 'Category 4',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 400,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 800,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1200,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1600,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 2000,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }, {
                id: `category-${generateId(10)}`,
                category: 'Category 5',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 400,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 800,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1200,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1600,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 2000,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }, {
                id: `category-${generateId(10)}`,
                category: 'Category 6',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    value: 400,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 800,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1200,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 1600,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }, {
                    id: `clue-${generateId(10)}`,
                    value: 2000,
                    clue: '',
                    answer: '',
                    isDailyDouble: false,
                }]
            }]
        }, {
            id: `round-${generateId(10)}`,
            num: 3,
            title: 'Round 3',
            type: 'final',
            categories: [{
                id: `category-${generateId(10)}`,
                category: 'Final Jeopardy Category',
                clues: [{
                    id: `clue-${generateId(10)}`,
                    clue: '',
                    answer: '',
                }]
            }]
        }]
    }
};