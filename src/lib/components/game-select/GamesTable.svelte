<script lang="ts">
	import type { GameInfo } from '$lib/database-models/game-info';
	import GameCard from './GameCard.svelte';

	export let gamesList: GameInfo[];
</script>

<div id="games">
	{#each gamesList as game}
		<GameCard gameInfo={game} />
	{/each}
</div>

<style>
	#games {
		display: grid;
		grid-template-columns: 22% 22% 22% 22%;
		grid-gap: 20px 3%;
		margin: 20px 0;
	}
</style>
