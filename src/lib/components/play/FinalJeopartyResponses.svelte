<script lang="ts">
	import type { Clue } from '$lib/database-models/game-data';
	import type { PlayerFinalJeoparty } from '$lib/player';
	import { createEventDispatcher } from 'svelte';

	export let clue: Clue;
	export let responses: Map<string, PlayerFinalJeoparty>;

	let shownIdx = 0;
	let timer: number | undefined;

	let responseData = Array.from(responses.values());
	let ids = Array.from(responses.keys());

	let showResponses = false;
	let showAnswer = false;
	let showWager = false;

	let dispatch = createEventDispatcher();

	const handleInterval = () => {
		if (showAnswer) {
			showWager = true;
			clearInterval();
		}
		if (!showAnswer) {
			showAnswer = true;
		}
	};

	const startInterval = () => {
		timer = window.setInterval(handleInterval, 3000);
	};

	const clearInterval = () => {
		window.clearInterval(timer);
		timer = undefined;
	};

	const handleKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (showResponses) {
			if (key === 'ArrowRight' || key === 'd') {
				if (shownIdx !== responses.size - 1) {
					shownIdx++;
				} else {
					dispatch('allAnswersShown');
				}
				dispatch('updateScore', {
					playerId: ids[shownIdx],
					amount: responseData[shownIdx].wager
				});
			} else if (key === 'ArrowLeft' || key === 'a') {
				shownIdx--;
				dispatch('updateScore', {
					playerId: ids[shownIdx],
					amount: responseData[shownIdx].wager
				});
			}
		} else {
			if (key === 'ArrowRight' || key === 'd') {
				showResponses = true;
				dispatch('updateScore', {
					playerId: ids[shownIdx],
					amount: responseData[shownIdx].wager
				});
				startInterval();
			}
		}
	};
</script>

{#if showResponses}
	{#each Array.from(responses.values()) as response, i}
		{#if shownIdx === i}
			<p>{response.name}</p>
			{#if showAnswer}
				<p>{response.answer}</p>
			{/if}
			{#if showWager}
				<p>{response.wager}</p>
			{/if}
		{/if}
	{/each}
	<p>{clue.answer}</p>
{:else}
	<p>Final Jeoparty Responses</p>
{/if}

<svelte:window on:keyup={handleKeyUp} />
