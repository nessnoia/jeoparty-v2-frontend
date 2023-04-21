<script lang="ts">
	import { getAddRoundData } from '$lib/defaults/edit';
	import ModalBase from './ModalBase.svelte';
	import type { RoundUpdater } from '$lib/update-models/game-data';
	import { unsaved } from '$lib/unsaved';
	import { createEventDispatcher } from 'svelte';

	export let isVisible = false;
	export let rounds: RoundUpdater[];

	const dispatch = createEventDispatcher();

	let title = 'Round ' + (rounds.length + 1);
	let type = 'normal';

	const addRound = () => {
		let nextRoundNum = rounds.length + 1;
		let newRoundData = getAddRoundData(nextRoundNum, title, type);
		unsaved.update((game) => {
			if (!game.updates) game.updates = [];
			game.updates.push(newRoundData);
			return game;
		});
		rounds = [...rounds, newRoundData];
		dispatch('changeRound', { showRoundIdx: rounds.length - 1 });
		isVisible = false;
	};
</script>

{#if isVisible}
	<ModalBase on:close={() => (isVisible = false)}>
		<h1>Add Round</h1>
		<label for="round-title">Round Title</label>
		<input name="round-title" type="text" placeholder="Round Name" bind:value={title} />
		<label>
			Type
			<label for="normal">Normal</label>
			<input name="type" type="radio" id="normal" value="normal" bind:group={type} checked />
			<label for="final">Final Jeoparty</label>
			<input name="type" type="radio" id="final" value="final" bind:group={type} />
		</label>
		<button on:click={addRound}>Create Round</button>
	</ModalBase>
{/if}
