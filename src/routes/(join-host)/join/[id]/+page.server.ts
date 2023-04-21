import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
    const codeRes = await fetch('/api/game-instance', { method: 'GET' });

    if (codeRes.ok) {
        return {
            code: await codeRes.json(),
            gameId: params.id,
        }
    }
};