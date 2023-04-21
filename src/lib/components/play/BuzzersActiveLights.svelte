<script lang="ts">
	import { roomStore } from '$lib/colyseus-client';
	import type { Room } from 'colyseus.js';

	export let buzzersActive: boolean;
	export let dailyDoubleOpen: boolean;
	let numLights = 5;

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		if (buzzersActive) {
			room.send('activateBuzzers');
		} else {
			room.send('deactivateBuzzers');
		}
	}

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (key === ' ' && !dailyDoubleOpen) {
			buzzersActive = !buzzersActive;
		}
	};
</script>

{#each Array(numLights) as _}
	<div class={buzzersActive ? 'active' : ''} />
{/each}

{#each Array(numLights) as _}
	<div class={buzzersActive ? 'active' : ''} />
{/each}

<svelte:window on:keyup|preventDefault={onKeyUp} />

<style>
	div {
		height: 50px;
		width: 100px;
		background-color: yellow;
	}

	div.active {
		height: 50px;
		width: 100px;
		background-color: blue;
	}
</style>
