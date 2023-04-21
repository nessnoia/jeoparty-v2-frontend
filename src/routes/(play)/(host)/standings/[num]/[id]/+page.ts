import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
    return {
        gameId: params.id,
        roundNum: params.num,
    }
}) satisfies PageLoad;