<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let score: number;
	export let maxWager: number;

	let dispatch = createEventDispatcher();

	const submitWager = (e: SubmitEvent) => {
		let wager = Number(new FormData(e.target as HTMLFormElement).get('bet'));
		dispatch('submitWager', { wager: wager });
	};
</script>

<form on:submit|preventDefault={submitWager}>
	<span>Your score: ${score ?? ''}</span>
	<span>Max wager: ${maxWager ?? ''}</span>
	<label for="bet">Wager</label>
	<span>$</span><input
		name="bet"
		placeholder="Enter wager"
		type="number"
		required
		min="0"
		max={maxWager}
	/>
	<button type="submit">Submit Wager</button>
</form>
