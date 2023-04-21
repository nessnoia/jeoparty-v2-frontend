<script lang="ts">
	import { roomStore } from '$lib/colyseus-client';
	import { type Round, sortClues } from '$lib/database-models/game-data';
	import { createEventDispatcher } from 'svelte';
	import PlayCategory from './PlayCategory.svelte';
	import PlayClue from './PlayClue.svelte';
	import ShowCategories from './ShowCategories.svelte';
	import type { Room } from 'colyseus.js';
	import FinalJeopardyClue from './FinalJeopardyClue.svelte';
	import FinalJeopartyResponses from './FinalJeopartyResponses.svelte';
	import type { PlayerFinalJeoparty } from '$lib/player';

	export let round: Round;
	export let buzzerWinnerId: string;
	export let firstPlayer: string;
	export let dailyDoubleOpen: boolean;
	export let dailyDoubleWager: number | undefined;

	let secondMostRecentWinner = '';
	let mostRecentWinner = firstPlayer;

	let showCategories = round.type === 'normal';
	let showPlayerAnswers = false;
	let dailyDoubleWagerSubmitted = false;

	let finalJeopartyResponses: Map<string, PlayerFinalJeoparty> = new Map();
	let dispatch = createEventDispatcher();

	let numClues = 0;
	let maxRoundClueValue = 0;
	for (let category of round.categories) {
		for (let clue of category.clues) {
			numClues++;
			if ((clue.value ?? 0) > maxRoundClueValue) {
				maxRoundClueValue = clue.value ?? 0;
			}
		}
	}

	let numCluesPlayed = 0;
	let lastClueValue = 0;

	$: room = $roomStore as Room | undefined;

	$: if (numClues === numCluesPlayed) {
		dispatch('goToNext');
	}

	$: if (showCategories && round.type === 'normal') {
		room?.send('updateGameState', {
			state: 'showCategories'
		});
	} else if (!showCategories && round.type === 'normal' && !dailyDoubleOpen) {
		room?.send('updateGameState', {
			state: 'buzzer'
		});
	}

	$: if (room !== undefined) {
		room.state.dailyDouble.onChange = (changes: any) => {
			for (let change of changes) {
				if (change.field == 'playerWager' && dailyDoubleOpen) {
					if (change.value !== -1) {
						lastClueValue = change.value;
						dailyDoubleWagerSubmitted = true;
						dailyDoubleWager = change.value;
					} else {
						dailyDoubleWager = undefined;
						dailyDoubleWagerSubmitted = false;
					}
				}
			}
		};

		room.state.finalJeoparty.onChange = () => {
			finalJeopartyResponses = new Map(room?.state.finalJeoparty);
			// console.log(finalJeopartyResponses);
			for (let [key, response] of finalJeopartyResponses) {
				let player = room?.state.players.get(key);
				response.name = player.name;
			}
		};
	}

	const clueClosed = () => {
		room?.send('updateGameState', {
			state: 'buzzer'
		});
		numCluesPlayed++;
		dailyDoubleOpen = false;
		dailyDoubleWager = undefined;
		dailyDoubleWagerSubmitted = false;
	};

	const clueOpen = (e: CustomEvent<{ value: number }>) => {
		room?.send('updateGameState', {
			state: 'clueOpen'
		});
		lastClueValue = e.detail.value;
		buzzerWinnerId = '';
	};

	const handleDailyDouble = () => {
		dailyDoubleOpen = true;
		room?.send('updateDailyDoubleInfo', {
			playerId: mostRecentWinner,
			clueValue: maxRoundClueValue
		});
		room?.send('updateGameState', {
			state: 'dailyDouble'
		});
		buzzerWinnerId = mostRecentWinner;
	};

	const updateFinalJeopartyScoreInfo = (e: CustomEvent<{ playerId: string; amount: number }>) => {
		// TODO: maybe change these variable names to be more generic, so it makes more sense
		// to be using them here
		buzzerWinnerId = e.detail.playerId;
		lastClueValue = e.detail.amount;
	};

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (buzzerWinnerId !== '') {
			if (key === 'ArrowUp' || key === '+' || key === 'w') {
				room?.send('updatePlayerScore', {
					id: buzzerWinnerId,
					clueValue: lastClueValue
				});
				secondMostRecentWinner = mostRecentWinner;
				mostRecentWinner = buzzerWinnerId;
			} else if (key === 'ArrowDown' || key === '-' || key === 's') {
				room?.send('updatePlayerScore', {
					id: buzzerWinnerId,
					clueValue: -lastClueValue
				});
				mostRecentWinner = secondMostRecentWinner;
			}
		}
	};
</script>

<!-- Render categories -->
{#if round.type == 'normal'}
	{#if showCategories}
		<ShowCategories categories={round.categories} bind:showCategories />
	{:else}
		{#each round.categories as category}
			<PlayCategory {category} />
			<!-- Render clues -->
			{#each category.clues.sort(sortClues) as clue}
				<PlayClue
					{clue}
					{dailyDoubleWagerSubmitted}
					on:clueUsed={clueClosed}
					on:clueOpen={clueOpen}
					on:dailyDouble={handleDailyDouble}
				/>
			{/each}
		{/each}
	{/if}
{:else if round.type == 'final'}
	<!-- Should only ever be one of each, but need to loop because of the possibly undefined arrays -->
	{#each round.categories || [] as category}
		{#each category.clues || [] as clue}
			{#if showPlayerAnswers}
				<FinalJeopartyResponses
					{clue}
					responses={finalJeopartyResponses}
					on:updateScore={updateFinalJeopartyScoreInfo}
					on:allAnswersShown={() => dispatch('goToNext')}
				/>
			{:else}
				<FinalJeopardyClue
					{category}
					{clue}
					responses={finalJeopartyResponses}
					on:showPlayerAnswers={() => (showPlayerAnswers = true)}
				/>
			{/if}
		{/each}
	{/each}
{/if}

<svelte:window on:keyup|preventDefault={onKeyUp} />
