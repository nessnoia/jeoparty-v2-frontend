<script lang="ts">
	import { unsaved } from '$lib/unsaved';
	import { isCategoryUpdate, type CategoryUpdater } from '$lib/update-models/game-data';

	export let category: CategoryUpdater;

	const saveCategoryUpdate = () => {
		unsaved.update((game) => {
			if (!game.updates) game.updates = [];
			let priorEdit = false;
			for (let update of game.updates) {
				if (isCategoryUpdate(update) && update.id === category.id) {
					update.category = category.category;
					priorEdit = true;
				}
			}
			if (!priorEdit) {
				game.updates.push({
					roundId: category.roundId,
					id: category.id,
					category: category.category
				});
			}
			return game;
		});
	};
</script>

<input
	type="text"
	placeholder="Category"
	bind:value={category.category}
	on:input={saveCategoryUpdate}
/>

<style>
	input {
		padding: 0.4em;
		width: 100%;
		margin: 2.5em 0 0.8em 0;
	}
</style>
