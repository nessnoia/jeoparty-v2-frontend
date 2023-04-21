import type { RequestHandler } from './$types';
import { githubAuth, googleAuth } from '$lib/server/lucia';

export const GET = (async ({ url, cookies }) => {
	const provider = url.searchParams.get('provider');
	if (provider === 'google') {
		const [url, state] = googleAuth.getAuthorizationUrl();
		cookies.set('oauth_state', state, {
			path: '/',
            httpOnly: true,
			maxAge: 60 * 60
		});
		return new Response(null, {
			status: 302,
			headers: {
				location: url
			}
		});
	} else if (provider === 'github') {
        const [url, state] = githubAuth.getAuthorizationUrl();
		cookies.set('oauth_state', state, {
			path: '/',
            httpOnly: true,
			maxAge: 60 * 60
		});
		return new Response(null, {
			status: 302,
			headers: {
				location: url
			}
		});
    }
	return new Response(null, {
		status: 400
	});
}) satisfies RequestHandler;