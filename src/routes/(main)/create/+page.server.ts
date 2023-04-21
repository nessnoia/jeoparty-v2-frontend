import type { Actions } from "./$types";
import type { GameInfo } from "$lib/database-models/game-info";
import { error, redirect } from "@sveltejs/kit";
import { generateCustomGameData, generateNormalGameData } from "$lib/defaults/game-data";

export const actions = {
	default: async ({ fetch, request, locals }) => {
        const data = await request.formData();

        let gameId = '';
        const promise = await locals.validateUser()
        .then(({ user }) => user.userId)
        .then(uid => {
            const gameInfo = createGameInfoObject(data, uid);
            return fetch('/api/game-info', {
                method: 'POST', 
                body: JSON.stringify(gameInfo),
            })
        })
        .then(res => res.json())
        .then(res => {
            gameId = res.id;
            const gameData = createGameDataObject(data);
            return fetch(`/api/game-data/${gameId}`, {
                method: 'POST',
                body: JSON.stringify(gameData)
            });
        })
        
        if (promise.ok) {
            throw redirect(303, '/edit/' + gameId);
        } else {
            throw error(promise.status, promise.statusText);
        }
    }
} satisfies Actions;


const createGameInfoObject = (data: FormData, uid: string) => {
    const gameTitle = data.get('title');
    const boardType = data.get('type');
    let numRounds = 1;
    let numQuestionsTotal = 1;
    if (boardType === 'standard') {
        numRounds = 3;
        numQuestionsTotal = 2 * (6 * 5) + 1;
    }
    const gameInfo = <GameInfo>{
        gameTitle: (gameTitle && gameTitle.length > 0) ? gameTitle : 'Untitled Game',
        boardType: boardType,
        ownedBy: uid,
        numRounds: numRounds,
        numQuestionsTotal: numQuestionsTotal,
    }
    return gameInfo;
};

const createGameDataObject = (data: FormData) => {
    const gameTitle = data.get('title');
    let gameData;
    if (data.get('type') === 'standard') {
        gameData = generateNormalGameData();
    } else {
        gameData = generateCustomGameData();
    }
    gameData.gameTitle = (gameTitle && gameTitle.length > 0) ? String(gameTitle) : 'Untitled Game';
    return gameData;
}