<script lang="ts">
	import { enhance } from '$app/forms';
	import { beforeNavigate } from '$app/navigation';
	import EditBoard from '$lib/components/edit/EditBoard.svelte';
	import NotSavedModal from '$lib/components/modals/NotSavedModal.svelte';
	import { unsaved } from '$lib/unsaved';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form: { saved?: boolean };

	let formElement: HTMLFormElement;
	let warnNotSavedOpen = false;
	let navLinkTo: string;

	const gameData = data.gameData.data;
	const gameInfo = data.gameInfo.data;
	const saveDelay = 5000;

	$: if (form?.saved) unsaved.set({});
	// TODO: implement stuff to save to local storage if there's an error saving to the database
	// $: if (!form?.saved) saveOnError();

	$: $unsaved, handleSave();

	const debounce = (callback: Function, delay: number) => {
		let timeout: NodeJS.Timeout;
		return (...args: any[]) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				callback(...args);
			}, delay);
		};
	};

	const handleSave = debounce(() => {
		if (formElement && Object.keys($unsaved).length > 0) {
			formElement.requestSubmit();
			console.log('save');
		}
	}, saveDelay);

	// const saveOnError = () => {
	//     window.localStorage.set()
	// }

	beforeNavigate(({ to }) => {
		if (Object.keys($unsaved).length > 0) {
			warnNotSavedOpen = true;
			if (to) {
				navLinkTo = to.url.pathname;
			}
		}
	});
</script>

<div id="edit">
	<div id="save-message">
		{#if Object.keys($unsaved).length > 0}
			<img src="/icons/spinner.svg" alt="save pending spinner" />
			<span>Saving...</span>
		{:else}
			<img src="/icons/circle-check.svg" alt="changes saved" />
			<span>All changes saved.</span>
		{/if}
	</div>

	<!-- {#if form !== undefined && !form?.saved}
	<span>Error saving data. Please refresh the page to try and save data.</span>
{/if} -->

	<EditBoard {gameInfo} {gameData} />
</div>

<form bind:this={formElement} method="POST" use:enhance>
	<input type="hidden" name="unsaved-changes" value={JSON.stringify($unsaved)} />
</form>

<NotSavedModal bind:isVisible={warnNotSavedOpen} to={navLinkTo} />

<style>
	#edit {
		min-width: var(--min-width);
		padding: 0 var(--gutter-size-other);
	}

	#save-message {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		gap: 0.8em;
	}

	#save-message img {
		height: 1.1em;
	}
</style>
