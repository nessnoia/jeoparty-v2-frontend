<script lang="ts">
	import { characters } from '$lib/selector-maps';

	export let name: string;
	export let character: string;
	export let colour: number;
	export let score: number;

	let characterComponent = characters[character];
</script>

<svelte:component this={characterComponent} colourChoice={colour} />
<span>{name}</span>
<span>${score}</span>
