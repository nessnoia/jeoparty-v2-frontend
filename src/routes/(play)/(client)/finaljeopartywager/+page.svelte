<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import WagerSubmittal from '$lib/components/play/client/WagerSubmittal.svelte';
	import type { Room } from 'colyseus.js';

	let score: number;
	let sessionId = '';

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		let player = room.state.players.get(sessionId);
		if (player !== undefined) {
			score = player.score;
		}
	}

	if (browser) {
		sessionId = sessionStorage.getItem('sessionId') ?? '';
	}

	const submitWager = (e: CustomEvent<{ wager: number }>) => {
		room?.send('finalJeopartyWager', {
			wager: e.detail.wager
		});
		goto('/finaljeopartywait');
	};
</script>

<WagerSubmittal maxWager={score} {score} on:submitWager={submitWager} />
