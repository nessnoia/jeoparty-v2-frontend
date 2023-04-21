import * as mongodb from 'mongodb';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { collections } from '$lib/server/database';
import { isCategoryUpdate, isClueUpdate, isRoundUpdate, type GameDataUpdater } from '$lib/update-models/game-data';

export const GET = (async ({ params }) => {
    try {
        const query = ({ _id: new mongodb.ObjectId(params.id) });
        const res = await collections.gamesData?.findOne(query);

        if (res) {
            return json({ status: 202, data: res })
        } else {
            throw error(501, `Failed to find game data by ID: ${params.id}`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;

export const POST = (async ({ params, request }) => {
    try {
        const gameData = await request.json();
        gameData._id = new mongodb.ObjectId(params.id);
        const result = await collections.gamesData?.insertOne(gameData);
  
        if (result?.acknowledged) {
            return json({ status: 202, id: result?.insertedId });
        } else {
            throw error(501, `Failed to create a new game by ID: ${result?.insertedId}`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;

export const PUT = (async ({params, request}) => {
    try {
        const data = await request.json();
        const gameDataUpdate = JSON.parse(data) as GameDataUpdater;
        const gameFilter: Record<string, any> = { _id: new mongodb.ObjectId(params.id) };

        let mongoUpdates: { update: any, arrayFilters?: any[] }[] = [];

        if (gameDataUpdate.gameTitle) {
            mongoUpdates.push({
                update: { $set: { gameTitle: gameDataUpdate.gameTitle }}
            });
        }

        if (gameDataUpdate.updates) {
            for (let update of gameDataUpdate.updates) {
                let id = update.id!;
                let deleteUpdate = update.delete;
                let addUpdate = update.add;

                delete update.delete;
                delete update.add;

                let setUnsetQuery = '';
                let pushPullQuery = '';
                let setUnsetArrayFilters: Record<string, any>[] = [];
                let pushPullArrayFilters: Record<string, any>[] = [];
                if (isRoundUpdate(update)) {
                    setUnsetQuery = 'rounds.$[round]';
                    pushPullQuery = 'rounds';
                    setUnsetArrayFilters = [{ 'round.id': id }];
                } else if (isCategoryUpdate(update)) {
                    setUnsetQuery = 'rounds.$[round].categories.$[category]';
                    pushPullQuery = 'rounds.$[round].categories';
                    setUnsetArrayFilters = [{ 'round.id': update.roundId }, { 'category.id': id }];
                    pushPullArrayFilters = [{ 'round.id': update.roundId }];
                    delete update.roundId;
                } else if (isClueUpdate(update)) {
                    setUnsetQuery = 'rounds.$[round].categories.$[category].clues.$[clue]';
                    pushPullQuery = 'rounds.$[round].categories.$[category].clues';
                    setUnsetArrayFilters = [{ 'round.id': update.roundId }, { 'category.id': update.categoryId }, { 'clue.id': id }];
                    pushPullArrayFilters = [{ 'round.id': update.roundId }, { 'category.id': update.categoryId }];
                    delete update.roundId;
                    delete update.categoryId;
                }

                if (deleteUpdate) {
                    let unsetUpdate = { $unset: { [setUnsetQuery]: 1 }};
                    let pullUpdate = { $pull: { [pushPullQuery]: null }};
                    mongoUpdates.push({
                        update: unsetUpdate,
                        arrayFilters: setUnsetArrayFilters,
                    });
                    mongoUpdates.push({
                        update: pullUpdate,
                        arrayFilters: pushPullArrayFilters,
                    });
                } else if (addUpdate) {
                    let pushUpdate = { $push: { [pushPullQuery]: update }};
                    mongoUpdates.push({
                        update: pushUpdate,
                        arrayFilters: pushPullArrayFilters,
                    });
                } else {
                    delete update.id;
                    let setUpdates: Record<string, any> = {};
                    for (const [fieldKey, fieldValue] of Object.entries(update)) {
                        let setQuery = `${setUnsetQuery}.${fieldKey}`;
                        setUpdates[setQuery] = fieldValue;
                    }
                    mongoUpdates.push({
                        update: { $set: setUpdates },
                        arrayFilters: setUnsetArrayFilters,
                    });
                }
            }
        }

        for (let update of mongoUpdates) {
            const res = await collections.gamesData?.updateOne(gameFilter, update.update, { arrayFilters: update.arrayFilters });
            if (!res || !res.acknowledged) {
                throw error(501, `Failed to update game data by ID: ${params.id}`);
            }
        }

        return json({ status: 202 })
        
    } catch (err) {
        console.log(err)
        throw error(502, String(err));
    }
}) satisfies RequestHandler;