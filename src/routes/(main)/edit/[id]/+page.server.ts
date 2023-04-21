import type { Actions, PageServerLoad } from './$types';
 
export const load = (async ({ fetch, params }) => {
    const infoRes = await fetch(`/api/game-info/${params.id}`, { method: 'GET' });
    const dataRes = await fetch(`/api/game-data/${params.id}`, { method: 'GET' });
    return {
        gameData: await dataRes.json(),
        gameInfo: await infoRes.json()
    };
}) satisfies PageServerLoad;

export const actions = {
    default: (async ({ fetch, params, request }) => {
        const form = await request.formData();
        const userUpdates = form.get('unsaved-changes');

        const jsonUpdates = JSON.parse(String(userUpdates));
        let infoRes = { ok: true };
        if (jsonUpdates.gameTitle) {
            infoRes = await fetch(`/api/game-info/${params.id}`, {
                method: 'PUT',
                body: jsonUpdates.gameTitle,
                headers: {
                    'content-type': 'text/plain'
                }
            })
        }

        const res = await fetch(`/api/game-data/${params.id}`, { 
            method: 'PUT',
            body: JSON.stringify(userUpdates),
            headers: {
                'content-type': 'application/json'
            }
        })

        if (res.ok && infoRes.ok) {
            return { saved: true };
        } else {
            return { saved: false };
        }
    })
} satisfies Actions;