import * as mongodb from 'mongodb';
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { collections } from '$lib/server/database';

export const GET = (async ({ params }) => {
    try {
        const query = ({ _id: new mongodb.ObjectId(params.id) });
        const res = await collections.gamesInfo?.findOne(query);

        if (res) {
            return json({ status: 202, data: res })
        } else {
            throw error(501, `Failed to find game info by ID: ${params.id}`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
    try {
        const query = ({ _id: new mongodb.ObjectId(params.id) });
        const res = await collections.gamesInfo?.deleteOne(query);

        if (res) {
            return json({ status: 202 })
        } else {
            throw error(501, `Failed to delete game info by ID: ${params.id}`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;

export const PUT = (async ({ params, request }) => {
    try {
        const query = ({ _id: new mongodb.ObjectId(params.id) });
        const gameTitle = await request.text();

        const res = await collections.gamesInfo?.updateOne(query, { $set: { gameTitle: gameTitle }});

        if (res) {
            return json({ status: 202 })
        } else {
            throw error(501, `Failed to delete game info by ID: ${params.id}`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;