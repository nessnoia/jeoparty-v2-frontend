<script lang="ts">
	import type { Category } from '$lib/database-models/game-data';
	import PlayCategory from './PlayCategory.svelte';

	export let categories: Category[];
	export let showCategories: boolean;

	let showCategoryIdx = 0;

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;

		if ((key === 'ArrowRight' || key === 'd') && showCategoryIdx < categories.length) {
			showCategoryIdx++;
		}

		if ((key === 'ArrowRight' || key === 'd') && showCategoryIdx === categories.length) {
			showCategories = false;
		}

		if ((key === 'ArrowLeft' || key === 'a') && showCategoryIdx > 0) {
			showCategoryIdx--;
		}
	};
</script>

{#each categories as category, i}
	{#if i === showCategoryIdx}
		<PlayCategory {category} />
	{/if}
{/each}

<svelte:window on:keyup|preventDefault={onKeyUp} />
