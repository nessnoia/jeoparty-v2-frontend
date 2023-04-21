<script lang="ts">
	import { unsaved } from '$lib/unsaved';
	import { isClueUpdate, type ClueUpdater } from '$lib/update-models/game-data';
	import { createEventDispatcher } from 'svelte';

	export let clue: ClueUpdater;
	export let roundType: string;
	export let boardType: string;
	export let maxDailyDoublesReached: boolean = false;

	const dispatch = createEventDispatcher();

	export let shownClue:
		| {
				id?: string;
		  }
		| undefined = undefined;

	$: if (shownClue !== currentClue) {
		showClueEditor = false;
	}

	const currentClue = {
		id: clue.id
	};

	let showClueEditor = false;

	const unsavedUpdater = (field: keyof ClueUpdater, value: any) => {
		unsaved.update((game) => {
			if (!game.updates) game.updates = [];
			let priorEdit = false;
			for (let update of game.updates) {
				if (isClueUpdate(update) && update.id === clue.id) {
					update[field] = value;
					priorEdit = true;
				}
			}
			if (!priorEdit) {
				let clueUpdate: ClueUpdater = {
					roundId: clue.roundId,
					categoryId: clue.categoryId,
					id: clue.id,
					[field]: value
				};
				game.updates.push(clueUpdate);
			}
			return game;
		});
	};
</script>

{#if roundType === 'normal'}
	<button
		on:click={() => {
			shownClue = currentClue;
			showClueEditor = !showClueEditor;
		}}>{clue.value}</button
	>
{/if}

{#if showClueEditor || roundType === 'final'}
	<div class="clue-editor">
		{#if roundType === 'normal' && boardType === 'custom'}
			<input
				type="number"
				placeholder="Value"
				bind:value={clue.value}
				on:input={() => {
					if (clue.value === null) clue.value = 0;
					else unsavedUpdater('value', clue.value);
				}}
			/>
		{/if}
		<div
			contenteditable="true"
			placeholder="Clue"
			bind:textContent={clue.clue}
			on:input={() => unsavedUpdater('clue', clue.clue)}
		/>

		<!-- TODO: allow for uploading images for clues -->
		<!-- <label for="img">Upload clue image:</label>
		<input type="file" id="img" name="img" accept="image/*" /> -->

		<div
			contenteditable="true"
			placeholder="Answer"
			bind:textContent={clue.answer}
			on:input={() => unsavedUpdater('answer', clue.answer)}
		/>

		{#if roundType === 'normal'}
			<div class="daily-double">
				<label for="daily-double">Make clue daily double?</label>
				<input
					type="checkbox"
					name="daily-double"
					bind:checked={clue.isDailyDouble}
					on:change={() => {
						unsavedUpdater('isDailyDouble', clue.isDailyDouble);
						let add = clue.isDailyDouble ? 1 : -1;
						dispatch('updateDailyDoubleNumber', { add: add });
					}}
					disabled={maxDailyDoublesReached && !clue.isDailyDouble}
				/>
			</div>
		{/if}
	</div>
{/if}

<style>
	.clue-editor {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		justify-content: space-evenly;
		margin: 0.7em 0 1em 0;
	}
	button {
		padding: 0.8em 1em;
		width: 100%;
		padding: 10% 0;
	}

	[contenteditable] {
		border: thin solid var(--black);
		border-radius: 0.1em;
		padding: 0.3em;
	}

	[contenteditable='true']:empty:before {
		content: attr(placeholder);
		pointer-events: none;
		display: block; /* For Firefox */
		color: var(--grey-400);
	}

	.daily-double {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
