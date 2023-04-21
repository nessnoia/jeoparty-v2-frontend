import type { PageServerLoad } from './$types';
import { type Actions, fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";

export const actions: Actions = {
	default: async ({ locals }) => {
		const session = await locals.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.setSession(null); // remove cookie
        throw redirect(302, '/login');
	}
};

export const load = (async ({ fetch, locals }) => {
    const res = await locals.validateUser().then(
        ({ user }) => fetch(`/api/game-info/user/${user.userId}`, { method: 'GET' })
    );
    // console.log(await res.json())
    return await res.json();
}) satisfies PageServerLoad;
