<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';
	import type { Room } from 'colyseus.js';

	let score: number;
	let wager: number;
	let sessionId = '';

	let form: HTMLFormElement;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		let player = room.state.players.get(sessionId);
		let playerFinalJeoparty = room.state.finalJeoparty.get(sessionId);
		if (player !== undefined && playerFinalJeoparty !== undefined) {
			score = player.score;
			wager = playerFinalJeoparty.wager;
		}

		room.state.listen('gameState', (change: any) => {
			if (change == 'timesUp') {
				form.requestSubmit();
				goto('/finaljeopartywait');
			}
		});
	}

	if (browser) {
		sessionId = sessionStorage.getItem('sessionId') ?? '';
	}

	const submitAnswer = (e: SubmitEvent) => {
		let answer = new FormData(e.target as HTMLFormElement).get('answer');
		room?.send('finalJeopartyAnswer', { answer: answer });
		goto('/finaljeopartywait');
	};
</script>

<form bind:this={form} on:submit|preventDefault={submitAnswer}>
	<span>Your score: ${score ?? ''}</span>
	<span>Your wager: ${wager ?? ''}</span>
	<label for="answer">Answer</label>
	<input name="answer" placeholder="Enter answer" type="text" required />
	<button type="submit">Submit Answer</button>
</form>
