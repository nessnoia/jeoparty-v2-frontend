<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import WagerSubmittal from '$lib/components/play/client/WagerSubmittal.svelte';
	import type { Room } from 'colyseus.js';

	let score: number;
	let maxWager: number;

	let sessionId = '';
	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		let player = room.state.players.get(sessionId);
		if (player !== undefined) {
			score = player.score;
			maxWager =
				score > room.state.dailyDouble.clueValue ? score : room.state.dailyDouble.clueValue;
		}
	}

	if (browser) {
		sessionId = sessionStorage.getItem('sessionId') ?? '';
	}

	const submitDailyDouble = (e: CustomEvent<{ wager: number }>) => {
		room?.send('updateDailyDoubleWager', {
			wager: e.detail.wager
		});
		goto('/buzzer');
	};
</script>

<WagerSubmittal {maxWager} {score} on:submitWager={submitDailyDouble} />
