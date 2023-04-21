<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import Waiting from '$lib/components/play/client/Waiting.svelte';
	import type { Room } from 'colyseus.js';

	let timerActive = false;
	let lastGameStateChange = '';

	$: if (lastGameStateChange == 'finalJeopartyCategory') {
		goto('/finaljeopartywager');
	} else if (lastGameStateChange == 'finalJeopartyAnswer' && timerActive) {
		goto('/finaljeopartyanswer');
	}

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.state.listen('fjTimerActive', (change: boolean) => {
			timerActive = change;
		});

		room.state.listen('gameState', (change: any) => {
			if (change == 'finalPodium') {
				goto('/finalpodium');
			}
			lastGameStateChange = change;
		});
	}
</script>

<Waiting>
	<h1>Waiting for final jeoparty.</h1>
</Waiting>
