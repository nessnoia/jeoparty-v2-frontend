<script lang="ts">
	import { goto } from '$app/navigation';
	import type { GameInfo } from '$lib/database-models/game-info';
	import ModalBase from './ModalBase.svelte';

	export let isVisible = false;
	export let gameInfo: GameInfo;

	function goToEdit() {
		goto('/edit/' + gameInfo._id);
	}

	function goToPlay() {
		goto('/join/' + gameInfo._id);
	}
</script>

{#if isVisible}
	<ModalBase on:close={() => (isVisible = false)}>
		<div slot="content">
			<h1>{gameInfo.gameTitle}</h1>
			<div id="button-container">
				<button on:click={goToEdit}>Edit Game</button>
				<button on:click={goToPlay}>Start Game</button>
			</div>
		</div>
	</ModalBase>
{/if}

<style>
	h1 {
		text-align: center;
	}

	#button-container {
		display: flex;
		flex-direction: row;
		gap: 1em;
		justify-content: space-between;
		padding: 0.5em 1em;
	}

	button {
		padding: 0.6em;
		width: 50%;
		font-size: var(--size-10);
		background-color: transparent;
		border: 1px var(--black) solid;
		border-radius: 0.3em;
	}

	button:hover {
		cursor: pointer;
	}
</style>
