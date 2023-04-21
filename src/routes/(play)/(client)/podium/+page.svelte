<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { attemptReconnect, roomStore } from '$lib/colyseus-client';
	import Waiting from '$lib/components/play/client/Waiting.svelte';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';

	let playerList: Player[] = [];
	let sessionId = '';

	let score: number;
	let place: number;

	let pointsBehind: number;
	let playerAhead: string;
	let pointsAhead: number;
	let playerBehind: string;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		updatePlayerInfo(room.state.players);
		room.state.listen('gameState', (change: string) => {
			if (change == 'showCategories') {
				goto('/categories');
			}

			if (change == 'finalJeoparty') {
				goto('/finaljeopartywait');
			}
		});

		room.state.listen('players', (playerChanges: any) => {
			updatePlayerInfo(playerChanges);
		});
	}

	const updatePlayerInfo = (playersMap: any) => {
		let playerIds: string[] = Array.from(playersMap.keys());
		let players: Player[] = Array.from(playersMap.values());
		for (let i = 0; i < players.length; i++) {
			let player = players[i];
			if (sessionId === playerIds[i]) {
				place = player.place;
				score = player.score;

				if (place != -1) {
					if (place === 1 && players.length != 1) {
						let nextIdx = place;
						pointsAhead = score - players[nextIdx].score;
						playerBehind = players[nextIdx].name;
					} else if (place === players.length && players.length != 1) {
						let prevIdx = place - 2;
						pointsBehind = players[prevIdx].score - score;
						playerAhead = players[prevIdx].name;
					} else if (players.length != 1) {
						let nextIdx = place;
						let prevIdx = place - 2;
						pointsBehind = players[prevIdx].score - score;
						playerAhead = players[prevIdx].name;

						pointsAhead = score - players[nextIdx].score;
						playerBehind = players[nextIdx].name;
					}
					break;
				}
			}
		}
	};

	if (browser) {
		sessionId = sessionStorage.getItem('sessionId') ?? '';
	}
</script>

<Waiting>
	<h1>Waiting for next round</h1>
</Waiting>

<p>Your score: ${score}</p>
<p>You are in {place} place.</p>
{#if place > 1 && pointsBehind !== undefined}
	<p>You are ${pointsBehind} behind {playerAhead}.</p>
{/if}
{#if place < playerList.length - 1 && pointsAhead !== undefined}
	<p>You are ${pointsAhead} behind {playerBehind}.</p>
{/if}
