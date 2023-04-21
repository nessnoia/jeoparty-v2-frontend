<script lang="ts">
	import { characters } from '$lib/selector-maps';

	export let character: string;
	export let colourChoice: number;
	export let name: string;
	export let score: number;
	export let standing: number;

	let characterComponent = characters[character];
</script>

<div class="podium">
	<div class="character-podium">
		<div class="character-component">
			<svelte:component this={characterComponent} {colourChoice} />
		</div>
	</div>
	<div style="--standing: {standing}" class="podium-detail">
		<div class="name"><span>{name}</span></div>
		<span>${score}</span>
		<span>{standing}</span>
	</div>
</div>

<style>
	.podium {
		position: relative;
	}

	.character-component {
		position: absolute;
		bottom: 0;
	}

	.character-podium {
		height: 100px;
		width: 100px;
		position: relative;
	}

	.podium-detail {
		height: calc(500px / var(--standing));
		width: 200px;
		background-color: cyan;
	}
</style>
