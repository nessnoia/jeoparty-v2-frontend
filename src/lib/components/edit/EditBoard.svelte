<script lang="ts">
	import { getAddCategoryData, getAddClueData, getAddRoundData } from '$lib/defaults/edit';
	import type { GameData } from '$lib/database-models/game-data';
	import type { GameInfo } from '$lib/database-models/game-info';
	import { unsaved } from '$lib/unsaved';
	import EditCategory from './EditCategory.svelte';
	import EditClue from './EditClue.svelte';
	import DraggableDiv from './DraggableDiv.svelte';
	import {
		isRoundUpdate,
		sortClues,
		type CategoryUpdater,
		type ClueUpdater,
		type RoundUpdater
	} from '$lib/update-models/game-data';
	import AddRoundModal from '../modals/AddRoundModal.svelte';
	import GarbageCan from './GarbageCan.svelte';
	import e from 'cors';

	// TODO: Focus on last used element after form submit
	export let gameInfo: GameInfo;
	export let gameData: GameData;

	let roundShownIdx: number = 0;
	let gameTitle: string = gameData.gameTitle ?? 'Untitled Game';

	let rounds: RoundUpdater[] = [];

	let draggableDivs: Record<string, DraggableDiv> = {};

	let addRoundVisible = false;

	let shownClue:
		| {
				id: string;
		  }
		| undefined;

	// Fill RoundUpdater array with gameData so we're not trying to update the prop (won't update UI)
	for (let i = 0; i < gameData.rounds.length; i++) {
		let round = gameData.rounds[i];

		let roundUpdater = {
			id: round.id,
			num: round.num,
			title: round.title,
			maxDailyDoubles: round.maxDailyDoubles,
			type: round.type,
			categories: [] as CategoryUpdater[]
		};
		rounds.push(roundUpdater);

		let numCategories = round.categories.length;
		let numDailyDoubles = 0;
		for (let j = 0; j < numCategories; j++) {
			let category = round.categories[j];

			let categoryUpdater = {
				roundId: round.id,
				id: category.id,
				category: category.category,
				clues: [] as ClueUpdater[]
			};

			draggableDivs[`${i}.${j}`];
			rounds[i].categories!.push(categoryUpdater);

			let numClues = category.clues.length;
			for (let k = 0; k < numClues; k++) {
				let clue = round.categories[j].clues[k];

				if (clue.isDailyDouble) {
					numDailyDoubles += 1;
				}

				let clueUpdater = {
					roundId: round.id,
					categoryId: category.id,
					id: clue.id,
					value: clue.value,
					clue: clue.clue,
					clueImage: clue.clueImage,
					answer: clue.answer,
					isDailyDouble: clue.isDailyDouble
				};

				draggableDivs[`${i}.${j}.${k}`];
				rounds[i].categories![j].clues!.push(clueUpdater);
			}
		}
		rounds[i].numDailyDoubles = numDailyDoubles;
	}

	const saveGameTitleUpdate = () => {
		unsaved.update((game) => {
			game.gameTitle = gameTitle;
			return game;
		});
	};

	const saveRoundUpdate = (id: string, field: keyof RoundUpdater, value: any) => {
		unsaved.update((game) => {
			if (!game.updates) game.updates = [];
			let priorEdit = false;
			for (let update of game.updates) {
				if (isRoundUpdate(update) && update.id === id) {
					update[field] = value;
					priorEdit = true;
				}
			}
			if (!priorEdit) {
				let roundUpdate: RoundUpdater = {
					id: id,
					[field]: value
				};
				game.updates.push(roundUpdate);
			}
			return game;
		});
	};

	const addCategory = (roundIdx: number, roundId: string) => {
		let newCategoryData = getAddCategoryData(roundId);
		unsaved.update((game) => {
			if (!game.updates) game.updates = [];
			game.updates.push(newCategoryData);
			return game;
		});
		rounds[roundIdx].categories = [...rounds[roundIdx].categories!, newCategoryData];
	};

	const addClue = (roundIdx: number, categoryIdx: number, roundId: string, categoryId: string) => {
		let newClueData = getAddClueData(roundId, categoryId);
		unsaved.update((game) => {
			if (!game.updates) game.updates = [];
			game.updates.push(newClueData);
			return game;
		});
		rounds[roundIdx].categories![categoryIdx].clues = [
			...rounds[roundIdx].categories![categoryIdx].clues!,
			newClueData
		];
	};

	const updateClueValuesAfterDrop = (roundIdx: number, categoryIdx: number) => {
		const clues = rounds[roundIdx].categories![categoryIdx].clues!;
		const sortedClues: ClueUpdater[] = [];
		clues.forEach((val) => {
			sortedClues.push(Object.assign({}, val));
		});
		sortedClues.sort(sortClues);
		for (let idx in clues) {
			clues[idx].value = sortedClues[idx].value;
		}
	};

	const saveCategoryChangesAfterDrop = (categoryArray: CategoryUpdater[], roundId: string) => {
		let categoryArrayCopy = [...categoryArray];
		for (let category of categoryArrayCopy) {
			delete category.roundId;
			for (let clue of category.clues || []) {
				delete clue.categoryId;
				delete clue.roundId;
			}
		}
		unsaved.update((game) => {
			let update: RoundUpdater = {
				id: roundId,
				categories: categoryArrayCopy
			};
			if (!game.updates) game.updates = [];
			game.updates = [...game.updates, update];
			return game;
		});
	};

	const saveClueChangesAfterDrop = (
		clueArray: ClueUpdater[],
		roundId: string,
		categoryId: string
	) => {
		let clueArrayCopy = [...clueArray];
		for (let clue of clueArrayCopy) {
			delete clue.categoryId;
			delete clue.roundId;
		}
		unsaved.update((game) => {
			let update: CategoryUpdater = {
				roundId: roundId,
				id: categoryId,
				clues: clueArrayCopy
			};
			if (!game.updates) game.updates = [];
			game.updates = [...game.updates, update];
			return game;
		});
	};
</script>

<div class="game-title">
	<label for="game-title">Game Title: </label>
	<input type="text" id="game-title" bind:value={gameTitle} on:input={saveGameTitleUpdate} />
</div>
{#if gameInfo.boardType === 'custom'}
	<GarbageCan bind:rounds />
{/if}

<!-- Render round toggle buttons before rendering round information -->
<div class="rounds">
	{#each rounds as round, roundIdx (`${roundIdx}`)}
		{@const key = `${roundIdx}`}
		<!-- Prevent round swapping, but still needs to be draggable for deletion. -->
		<DraggableDiv
			bind:this={draggableDivs[key]}
			bind:updateArray={rounds}
			on:dragstart={(event) => {
				draggableDivs[key].dragStart(event, roundIdx, round);
			}}
			on:drop={(event) => {
				event.preventDefault();
			}}
		>
			<button class:active={roundIdx == roundShownIdx} on:click={() => (roundShownIdx = roundIdx)}
				>{rounds[roundIdx].title}</button
			>
		</DraggableDiv>
	{/each}
</div>

<!-- Render rounds -->
{#each rounds as round, roundIdx (`${roundIdx}`)}
	{#if roundIdx == roundShownIdx}
		<div class="round-title">
			<label for="round-title">Round Title: </label>
			<input
				type="text"
				id="round-title"
				bind:value={rounds[roundIdx].title}
				on:input={() => saveRoundUpdate(round.id ?? '', 'title', rounds[roundIdx].title)}
			/>
		</div>

		<!-- Render categories -->
		{#if round.type == 'normal'}
			{#if gameInfo.boardType == 'standard'}
				<!-- TODO: make 's' reactive based on the number -->
				<p class="daily-double">
					You have <b
						>{(round.maxDailyDoubles || 0) - (round.numDailyDoubles || 0)} Daily Double(s)</b
					> left for this round.
				</p>
			{:else if gameInfo.boardType == 'custom'}
				<p>
					You have {round.numDailyDoubles || 0} Daily Double(s) on this round.
				</p>
			{/if}
			<div class="categories">
				{#each round.categories || [] as category, categoryIdx (`${roundIdx}.${categoryIdx}`)}
					{@const key = `${roundIdx}.${categoryIdx}`}
					<DraggableDiv
						bind:this={draggableDivs[key]}
						bind:updateArray={round.categories}
						on:dragstart={(event) => {
							draggableDivs[key].dragStart(event, categoryIdx, category);
						}}
						on:drop={(event) => {
							event.preventDefault();
							draggableDivs[key].drop(event, categoryIdx, category);
							saveCategoryChangesAfterDrop(round.categories || [], round.id || '');
						}}
					>
						<div class="clue-column">
							<EditCategory bind:category />

							<!-- Render clues -->
							{#each category.clues || [] as clue, clueIdx (`${roundIdx}.${categoryIdx}.${clueIdx}`)}
								{@const key = `${roundIdx}.${categoryIdx}.${clueIdx}`}
								<DraggableDiv
									bind:this={draggableDivs[key]}
									bind:updateArray={category.clues}
									on:dragstart={(event) => {
										draggableDivs[key].dragStart(event, clueIdx, clue);
									}}
									on:drop={(event) => {
										event.preventDefault();
										draggableDivs[key].drop(event, clueIdx, clue);
										if (gameInfo.boardType == 'standard') {
											updateClueValuesAfterDrop(roundIdx, categoryIdx);
										}
										saveClueChangesAfterDrop(
											category.clues || [],
											round.id || '',
											category.id || ''
										);
									}}
								>
									<EditClue
										on:updateDailyDoubleNumber={(event) => {
											if (round.numDailyDoubles !== undefined) {
												round.numDailyDoubles += event.detail.add;
												saveRoundUpdate(
													round.id ?? '',
													'numDailyDoubles',
													round.numDailyDoubles + 1
												);
											}
										}}
										bind:clue
										bind:shownClue
										roundType={round.type}
										boardType={gameInfo.boardType}
										maxDailyDoublesReached={(round.maxDailyDoubles || -1) -
											(round.numDailyDoubles || 0) ==
											0}
									/>
								</DraggableDiv>
							{/each}
						</div>
					</DraggableDiv>
					{#if gameInfo.boardType == 'custom' && round.type == 'normal' && (category.clues || []).length < 10}
						<button
							on:click={() => {
								addClue(roundShownIdx, categoryIdx, round.id || '', category.id || '');
							}}
							><img src="/icons/circle-plus.svg" alt="add category" />
						</button>
					{/if}
				{/each}
			</div>
		{:else if round.type == 'final'}
			<!-- Should only ever be on of each, but need to loop because of the possibly undefined arrays -->
			{#each round.categories || [] as category}
				<EditCategory {category} />
				{#each category.clues || [] as clue}
					<EditClue {clue} roundType={round.type} boardType={gameInfo.boardType} />
				{/each}
			{/each}
		{/if}
		{#if gameInfo.boardType == 'custom'}
			{#if rounds.length < 5}
				<button
					on:click={() => {
						addRoundVisible = true;
					}}
					><img src="/icons/circle-plus.svg" alt="add round" />
				</button>
				<AddRoundModal
					on:changeRound={(event) => (roundShownIdx = event.detail.showRoundIdx)}
					bind:isVisible={addRoundVisible}
					bind:rounds
				/>
			{/if}
			{#if round.type == 'normal' && (round.categories || []).length < 8}
				<button
					on:click={() => {
						addCategory(roundShownIdx, round.id || '');
					}}
					><img src="/icons/circle-plus.svg" alt="add clue" />
				</button>
			{/if}
		{/if}
	{/if}
{/each}

<style>
	input {
		width: 200px;
		padding: 0.2em;
	}

	.game-title {
		display: flex;
		flex-direction: row;
		gap: 1em;
		margin: 1em 0;
		justify-content: start;
		align-items: center;
	}

	.game-title label {
		font-weight: bold;
	}
	.rounds {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 0.4em;
		margin: 1em 0;
	}

	.rounds button {
		background-color: transparent;
		border-left: 1px solid var(--black);
		border-right: 1px solid var(--black);
		border-top: none;
		border-bottom: none;
		padding: 0.8em;
		width: 100%;
	}

	.rounds button:hover {
		cursor: pointer;
	}

	.rounds button.active {
		color: var(--white);
		background-color: var(--black);
		font-weight: bold;
	}

	.round-title {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1em;
		margin-top: 4em;
	}

	.round-title label {
		font-weight: bold;
	}

	.daily-double {
		margin-top: 0.5em;
		margin-bottom: -1em;
		text-align: center;
	}

	.categories {
		display: flex;
		flex-direction: row;
		gap: 1.5em;
		justify-content: space-between;
		min-width: var(--min-width);
		margin: 2em 0;
	}

	.clue-column {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 0.6em;
		min-width: 90px;
	}
</style>
