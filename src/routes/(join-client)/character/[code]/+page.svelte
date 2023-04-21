<script lang="ts">
	import Elephant from '$lib/components/characters/elephants/Elephant.svelte';
	import type { ComponentType } from 'svelte/internal';
	import {
		activitySelectors,
		characters,
		characterSelectors,
		animalToActivities
	} from '$lib/selector-maps';
	import * as Colyseus from 'colyseus.js';
	import type { PageData } from './$types';
	import { PUBLIC_COLYSEUS_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { roomStore } from '$lib/colyseus-client';

	export let data: PageData;

	let gameCode = data.code;
	let randomElephantIndexes = data.indexes;

	let nickname = '';
	let colourChoice: number = 0;
	let characterChoice: ComponentType = Elephant;
	let animalChoiceString: string = 'elephant';
	let characterChoiceString: string = 'elephant';

	function changeCharaterSelection(selector: ComponentType) {
		animalChoiceString = characterSelectors.get(selector) || '';
		characterChoiceString = animalChoiceString;
		characterChoice = characters[animalChoiceString];
	}

	function changeActivitySelection(selector: ComponentType) {
		let choice = activitySelectors.get(selector) || '';
		characterChoiceString = animalChoiceString + choice;
		characterChoice = characters[characterChoiceString];
	}

	const join = () => {
		let client = new Colyseus.Client(PUBLIC_COLYSEUS_URL);
		let joinObj = {
			gameCode: gameCode,
			name: nickname,
			character: characterChoiceString,
			colour: colourChoice
		};
		client.join('jeoparty', joinObj).then((room) => {
			roomStore.set(room);
			sessionStorage.setItem('joinObj', JSON.stringify(joinObj));
			sessionStorage.setItem('roomId', room.id);
			sessionStorage.setItem('sessionId', room.sessionId);
		});
		goto('/waitingroom');
	};
</script>

<div>
	<h1>Create Character</h1>
	<input placeholder="Nickname" type="text" bind:value={nickname} />

	<div class="charactor">
		<svelte:component this={characterChoice} {colourChoice} />
	</div>

	<h2>Select Character</h2>

	{#each [...characterSelectors] as [selector, i]}
		<button class="char-selector" on:click={() => changeCharaterSelection(selector)}>
			<svelte:component this={selector} />
		</button>
	{/each}

	<h2>Select Activity</h2>

	{#if animalChoiceString == 'elephant'}
		{#each animalToActivities[animalChoiceString] as selector, i}
			{#if i == 0 || i == 1 || i == 2 || randomElephantIndexes.has(i)}
				<button class="act-selector" on:click={() => changeActivitySelection(selector)}>
					<svelte:component this={selector} />
				</button>
			{/if}
		{/each}
	{:else}
		{#each animalToActivities[animalChoiceString] as selector}
			<button class="act-selector" on:click={() => changeActivitySelection(selector)}>
				<svelte:component this={selector} />
			</button>
		{/each}
	{/if}

	<div>
		<h2>Colour</h2>
		<input id="colour-selector" type="range" min="0" max="360" bind:value={colourChoice} />
		<div class="colour" />
	</div>

	<button on:click={join}>Join Game</button>
</div>

<style>
	.charactor {
		width: 300px;
		height: 300px;
	}

	.char-selector,
	.act-selector {
		height: 50px;
		width: 50px;
	}

	/** Chrome*/
	input[type='range'] {
		overflow: hidden;
		width: 80%;
		height: 15px;
		border-radius: 15px;
		-webkit-appearance: none;
		appearance: none;
		background: linear-gradient(
			to right,
			#ff0000 0%,
			#ffff00 17%,
			#00ff00 33%,
			#00ffff 50%,
			#0000ff 67%,
			#ff00ff 83%,
			#ff0000 100%
		);
	}
	/* input[type='range']::-webkit-slider-runnable-track {
		height: 10px;
		-webkit-appearance: none;
		color: #13bba4;
		margin-top: -1px;
	} */
	input[type='range']::-webkit-slider-thumb {
		width: 15px;
		-webkit-appearance: none;
		height: 15px;
		/* box-shadow: ; */
		border-radius: 50%;
		/* border-width: 2px;
		border-color: white; */
		background: #434343;
	}

	/** FF*/
	input[type='range']::-moz-range-track {
		background-color: linear-gradient(
			to right,
			#ff0000 0%,
			#ffff00 17%,
			#00ff00 33%,
			#00ffff 50%,
			#0000ff 67%,
			#ff00ff 83%,
			#ff0000 100%
		);
	}

	/* IE*/
	/* input[type='range']::-ms-fill-lower {
		background-color: #43e5f7;
	} */
	input[type='range']::-ms-fill {
		background-color: linear-gradient(
			to right,
			#ff0000 0%,
			#ffff00 17%,
			#00ff00 33%,
			#00ffff 50%,
			#0000ff 67%,
			#ff00ff 83%,
			#ff0000 100%
		);
	}

	/* #colour-selector {
		background: 
	} */
</style>
