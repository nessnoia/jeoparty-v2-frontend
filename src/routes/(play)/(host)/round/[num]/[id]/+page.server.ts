import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
    const res = await fetch(`/api/game-data/${params.id}`, { method: 'GET' });

    if (res.ok) {
        let data = await res.json();
        return {
            gameData: data,
            roundNum: params.num,
            gameId: params.id,
        }
    }
};