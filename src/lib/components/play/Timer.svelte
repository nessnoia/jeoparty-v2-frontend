<script lang="ts">
	import { roomStore } from '$lib/colyseus-client';
	import type { Room } from 'colyseus.js';

	export let buzzersActive: boolean;
	export let startTimer: boolean;
	export let length: number;
	export let roundType: string;

	let numLights = 9;
	let interval = Number(length / Math.ceil(numLights / 2));
	let lightsActive: boolean[] = [];
	let counter = length;

	$: room = $roomStore as Room | undefined;

	let timer: number | undefined;

	$: if (startTimer) {
		handleTimerStart();
	} else {
		handleTimerCancel();
	}

	for (let i = 0; i < numLights; i++) {
		lightsActive.push(false);
	}

	const handleTimer = () => {
		let firstIdx = (length - counter) / interval;
		let lastIdx = numLights - firstIdx - 1;

		lightsActive[firstIdx] = false;
		lightsActive[lastIdx] = false;

		counter = counter - interval;
		if (counter === 0) {
			window.clearInterval(timer);
			timer = undefined;
			buzzersActive = false;
			room?.send('updateGameState', { state: 'timesUp' });
			room?.send('deactivateFJTimer');
		}
	};

	const handleTimerStart = () => {
		for (let i = 0; i < numLights; i++) {
			lightsActive[i] = true;
		}
		counter = length;
		if (timer === undefined) {
			timer = window.setInterval(handleTimer, interval * 1000);
		}
	};

	const handleTimerCancel = () => {
		for (let i = 0; i < numLights; i++) {
			lightsActive[i] = false;
		}
		if (timer !== undefined) {
			window.clearInterval(timer);
			timer = undefined;
		}
	};

	const onKeyUp = (e: KeyboardEvent) => {
		const key = e.key;
		if (key === ' ') {
			if (buzzersActive && roundType == 'normal') {
				handleTimerStart();
			} else if (!buzzersActive && roundType == 'normal') {
				handleTimerCancel();
			}

			if (roundType == 'final') {
				if (timer === undefined) {
					handleTimerStart();
					room?.send('activateFJTimer');
				} else {
					handleTimerCancel();
					room?.send('deactivateFJTimer');
				}
			}
		}
	};
</script>

{#each Array(numLights) as _, i}
	<div class={lightsActive[i] ? 'active' : ''} />
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
