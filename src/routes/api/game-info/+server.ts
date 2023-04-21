import { collections } from '$lib/server/database';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({}) => {
    try {
        const res = await collections.gamesInfo?.find({}).toArray();
        if (res) {
            return json({ status: 202, data: res })
        } else {
            throw error(501, 'Failed to find game info');
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
    try {
        const gameInfo = await request.json();
        const result = await collections.gamesInfo?.insertOne(gameInfo);
  
        if (result?.acknowledged) {
            return json({ status: 202, id: result?.insertedId });
        } else {
            throw error(501, `Failed to create new game info: ${result?.insertedId}`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;