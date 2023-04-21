<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import Waiting from '$lib/components/play/client/Waiting.svelte';
	import type { Room } from 'colyseus.js';

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.state.listen('gameState', (change: any) => {
			if (change == 'buzzer') {
				goto('/buzzer');
			}
		});
	}
</script>

<Waiting>
	<h1>Showing categories</h1>
	<h2>Get ready...</h2>
</Waiting>
