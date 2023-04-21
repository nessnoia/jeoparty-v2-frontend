<script lang="ts">
	import { roomStore } from '$lib/colyseus-client';
	import FullPodium from '$lib/components/play/FullPodium.svelte';
	import type { Room } from 'colyseus.js';

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.send('updateGameState', { state: 'finalPodium' });
	}
</script>

<h1>Final Standings</h1>

<FullPodium />
