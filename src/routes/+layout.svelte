<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';

	if (browser) {
		handleSession(page);
	}
</script>

<slot />
