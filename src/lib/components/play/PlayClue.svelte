<script lang="ts">
	import type { Clue } from '$lib/database-models/game-data';
	import { createEventDispatcher } from 'svelte';

	export let clue: Clue;
	export let dailyDoubleWagerSubmitted: boolean;

	const dispatch = createEventDispatcher();

	let displayClue = false;
	let displayAnswer = false;
	let displayDailyDouble = false;

	let clueUsed = false;

	const displayClueCard = () => {
		if (clue.isDailyDouble) {
			displayDailyDouble = true;
			dispatch('dailyDouble');
		} else {
			displayClue = true;
			dispatch('clueOpen', { value: clue.value ?? 0 });
		}
	};

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (displayDailyDouble && dailyDoubleWagerSubmitted) {
			if (key === 'Esc' || key === 'Escape') {
				displayDailyDouble = false;
			} else if (key === 'ArrowRight' || key === 'd') {
				displayDailyDouble = false;
				displayClue = true;
			}
			return;
		}

		if (displayClue) {
			if (key === 'ArrowRight' || key === 'd') {
				displayClue = false;
				displayAnswer = true;
			} else if (key === 'Esc' || key === 'Escape') {
				displayClue = false;
			}
			return;
		}

		if (displayAnswer) {
			if (key === 'ArrowLeft' || key === 'a') {
				displayAnswer = false;
				displayClue = true;
			} else if (key === 'ArrowRight' || key === 'd' || key === 'Esc' || key === 'Escape') {
				displayAnswer = false;
				dispatch('clueUsed');
				clueUsed = true;
			}
			return;
		}
	};
</script>

{#if !clueUsed}
	<button on:click={displayClueCard}>{clue.value}</button>
{:else}
	<div />
{/if}

{#if displayDailyDouble}
	<div>
		<p>Daily Double</p>
	</div>
{/if}

{#if displayClue}
	<div>
		<p>{clue.clue}</p>
	</div>
{/if}

{#if displayAnswer}
	<div>
		<p>{clue.answer}</p>
	</div>
{/if}

<svelte:window on:keyup|preventDefault={onKeyUp} />
