<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';

	let sessionId = '';

	let score: number;
	let place: number;

	let pointsBehind: number;
	let playerAhead: string;
	let pointsAhead: number;
	let playerBehind: string;

	let wonBuzz = false;
	let lostBuzz = false;
	let buzzersActive = false;
	let clueOpen = false;

	if (browser) {
		sessionId = sessionStorage.getItem('sessionId') ?? '';
	}

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		updatePlayerInfo(room.state.players);
		room.state.listen('gameState', (change: string) => {
			if (change == 'podium') {
				goto('/podium');
			}

			if (change == 'finalPodium') {
				goto('/finalpodium');
			}

			// Question has been closed, clear buzzer colours.
			if (change == 'buzzer') {
				wonBuzz = false;
				lostBuzz = false;
				clueOpen = false;
			}

			if (change == 'clueOpen') {
				clueOpen = true;
				wonBuzz = false;
				lostBuzz = false;
			}

			if (change == 'timesUp') {
				// Need this so if someone wins the buzz, when the timer runs out their screen stays green.
				if (!wonBuzz) {
					lostBuzz = true;
				}
			}

			if (change == 'dailyDouble') {
				if (room?.state.dailyDouble.playerId == sessionId) {
					goto('/dailydouble');
				}
			}
		});

		room.state.listen('buzzersActive', (current: boolean) => {
			buzzersActive = current;
		});

		room.state.listen('buzzerWinner', (winId: string) => {
			if (winId === sessionId) {
				wonBuzz = true;
			} else if (winId === '') {
				wonBuzz = false;
				lostBuzz = false;
			} else {
				lostBuzz = true;
			}
		});

		room.state.listen('players', (playersChange: any) => {
			updatePlayerInfo(playersChange);
		});
	}

	const buzz = () => {
		if (clueOpen) {
			room?.send('buzzer');
		}
	};

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
</script>

<div class:active={buzzersActive} class:winner={wonBuzz} class:loser={lostBuzz}>
	<h3>Your score</h3>
	<span>${score}</span>

	<button on:click={buzz} />

	{#if place != -1}
		<p>You are in {place} place.</p>
		{#if pointsBehind !== undefined}
			<p>You are ${pointsBehind} behind {playerAhead}.</p>
		{/if}
		{#if pointsAhead !== undefined}
			<p>You are ${pointsAhead} ahead of {playerBehind}.</p>
		{/if}
	{/if}
</div>

<style>
	.active {
		background-color: blue;
	}

	.winner {
		background-color: green;
	}

	.loser {
		background-color: red;
	}
</style>
