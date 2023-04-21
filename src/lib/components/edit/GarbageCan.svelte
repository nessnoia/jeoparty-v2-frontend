<script lang="ts">
	import { unsaved } from '$lib/unsaved';
	import {
		isCategoryUpdate,
		isRoundUpdate,
		type CategoryUpdater,
		type ClueUpdater,
		type RoundUpdater
	} from '$lib/update-models/game-data';

	export let rounds: RoundUpdater[];

	const handleRoundDelete = (dropItem: RoundUpdater, deleteIdx: number) => {
		if (rounds.length === 1) {
			alert('Must have at least one round per game.');
			return;
		}

		rounds.splice(deleteIdx, 1);

		const round = {
			id: dropItem.id,
			delete: true
		};
		unsaved.update((game) => {
			if (!game.updates) game.updates = [];
			game.updates = [...game.updates, round];
			return game;
		});
	};

	const handleCategoryDelete = (dropItem: CategoryUpdater, deleteIdx: number) => {
		let categories = rounds.find((val) => val.id === dropItem.roundId)?.categories;

		if (categories?.length === 1) {
			alert('Must have at least one category per round.');
			return;
		}

		categories?.splice(deleteIdx, 1);

		const category = {
			roundId: dropItem.roundId,
			id: dropItem.id,
			delete: true
		};
		unsaved.update((game) => {
			if (!game.updates) game.updates = [];
			game.updates = [...game.updates, category];
			return game;
		});
	};

	const handleClueDelete = (dropItem: ClueUpdater, deleteIdx: number) => {
		let clues = rounds
			.find((val) => val.id === dropItem.roundId)
			?.categories?.find((val) => val.id === dropItem.categoryId)?.clues;

		if (clues?.length === 1) {
			alert('Must have at least one clue per category.');
			return;
		}

		clues?.splice(deleteIdx, 1);

		const clue = {
			roundId: dropItem.roundId,
			categoryId: dropItem.categoryId,
			id: dropItem.id,
			delete: true
		};
		unsaved.update((game) => {
			if (!game.updates) game.updates = [];
			game.updates = [...game.updates, clue];
			return game;
		});
	};

	const handleDrop = (event: DragEvent) => {
		if (event.dataTransfer) {
			const obj = JSON.parse(event.dataTransfer.getData('text/plain'));
			const item = obj.item;
			const idx = obj.start;

			if (isRoundUpdate(item)) {
				handleRoundDelete(item, idx);
			} else if (isCategoryUpdate(item)) {
				handleCategoryDelete(item, idx);
			} else {
				handleClueDelete(item, idx);
			}
			rounds = rounds;
		}
	};
</script>

<div on:drop={handleDrop} on:dragover|preventDefault>
	<img src="/icons/trash.svg" alt="delete item" />
</div>
