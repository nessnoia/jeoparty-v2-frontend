<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import Waiting from '$lib/components/play/client/Waiting.svelte';
	import type { Room } from 'colyseus.js';

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room?.state.listen('gameState', (change: any) => {
			if (change == 'showCategories') {
				goto('/categories');
			}
		});
	}
</script>

<Waiting>
	<h1>Waiting for game to start</h1>
</Waiting>

<!-- <svelte:window on:beforeunload={onBeforeUnload} /> -->
