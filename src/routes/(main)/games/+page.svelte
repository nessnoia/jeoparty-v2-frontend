<script lang="ts">
	import { goto } from '$app/navigation';
	import GamesTable from '$lib/components/game-select/GamesTable.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;

	let games = data.data;

	const goToCreatePage = () => {
		goto('/create');
	};
</script>

<!-- <form use:enhance method="post">
	<input type="submit" class="button" value="Sign out" />
</form> -->

<div id="container">
	<div id="game-add-controls">
		<h1>Your Games</h1>

		<div id="game-buttons">
			<button><img src="/icons/circle-minus.svg" alt="delete games" /></button>
			<button on:click={goToCreatePage}><img src="/icons/circle-plus.svg" alt="add game" /></button>
		</div>
	</div>

	<!-- <input id="search" type="text" placeholder="Search for games" /> -->

	<!-- TODO: Add filtering functionality -->
	<!-- <div>
	<span>Filter by:</span>
	<button>Tags</button>
	<button># of Rounds</button>
	<button># of Questions</button>
</div> -->

	<GamesTable gamesList={games} />
</div>

<style>
	#container {
		min-width: var(--min-width);
		padding: 10px var(--gutter-size-other) 0 var(--gutter-size-other);
		margin-top: 100px;
		display: flex;
		flex-direction: column;
		align-content: center;
		gap: 30px;
	}

	#game-add-controls {
		text-align: center;
	}

	#game-add-controls h1 {
		display: inline;
	}

	#game-add-controls #game-buttons {
		float: right;
		display: inline;
	}

	#game-buttons button {
		background-color: transparent;
		border: 0px;
	}

	#game-buttons img {
		height: 25px;
	}

	#game-buttons button:hover {
		cursor: pointer;
	}

	/* #search {
		background: url('/icons/magnifying-glass.svg') no-repeat scroll 5px;
		background-size: 20px;
		padding: 8px;
		padding-left: 40px;
		box-shadow: none;
		outline: none;
		border: 1px solid var(--black);
	}

	#search:focus {
		box-shadow: none;
		outline: none;
		border: 1px solid var(--grey-200);
	} */
</style>
