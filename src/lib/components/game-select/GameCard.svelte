<script lang="ts">
	import type { GameInfo } from '$lib/database-models/game-info';
	import GameSelectModal from '../modals/GameSelectModal.svelte';

	export let gameInfo: GameInfo;

	let gamePreviewOpen: boolean = false;
</script>

<button on:click={() => (gamePreviewOpen = true)}>
	<h3>{gameInfo.gameTitle}</h3>
</button>

<GameSelectModal bind:isVisible={gamePreviewOpen} {gameInfo} />

<style>
	button {
		padding: 10px;
		height: 100px;
		max-width: 200px;
		text-overflow: ellipsis;
		background-color: white;
		border: 1px var(--black) solid;
		border-radius: 10px;
	}

	button:hover {
		cursor: pointer;
	}
</style>
