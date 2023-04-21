import { collections } from "$lib/server/database";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET = (async () => {
    try {
        let code = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 6) {
            code += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }

        const data = {
            code: code
        };
        const res = await collections.gameCodes?.insertOne(data);

        if (res) {
            return json({ status: 202, code: code })
        } else {
            throw error(501, `Failed to create new game instance: ${ code }`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;

export const DELETE = (async ({ request }) => {
    try {
        const data = await request.json();
        const res = await collections.gameCodes?.deleteOne(data);

        if (res) {
            return json({ status: 202 });
        } else {
            throw error(501, `Failed to delete game instance: ${ data._id }`);
        }
    } catch (err) {
        throw error(502, String(err));
    }
}) satisfies RequestHandler;