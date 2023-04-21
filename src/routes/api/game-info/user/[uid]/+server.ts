import { error, json, type RequestHandler } from "@sveltejs/kit";
import { collections } from '$lib/server/database';

export const GET = (async ({ params }) => {
    try {
        const query = ({ ownedBy: params.uid });
        const res = await collections.gamesInfo?.find(query).toArray();

        if (res) {
            return json({ status: 202, data: res })
        } else {
            throw error(501, `Failed to find game info by ID: ${params.id}`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;