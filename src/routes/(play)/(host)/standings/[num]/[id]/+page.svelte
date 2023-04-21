<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import FullPodium from '$lib/components/play/FullPodium.svelte';
	import type { Room } from 'colyseus.js';
	import type { PageData } from './$types';

	export let data: PageData;

	let gameId = data.gameId;
	let roundNum = data.roundNum;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.send('updateGameState', { state: 'podium' });
	}

	if (browser) {
		setTimeout(() => {
			goto(`/round/${Number(roundNum) + 1}/${gameId}`);
		}, 8000);
	}
</script>

<h1>Standings</h1>

<FullPodium />
