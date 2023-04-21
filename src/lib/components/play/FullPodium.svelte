<script lang="ts">
	import { roomStore } from '$lib/colyseus-client';
	import Podium from '$lib/components/play/Podium.svelte';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';

	let playerList: Player[] = [];

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		room.state.players.$items.forEach((player: any) => {
			let playerObj = {
				name: player.name,
				character: player.character,
				characterColour: player.colour,
				score: player.score,
				place: -1
			};
			playerList.push(playerObj);
		});
	}
</script>

<div class="podium">
	{#each playerList as player, i}
		{#if i < 6}
			<Podium
				character={player.character}
				colourChoice={player.characterColour}
				name={player.name}
				score={player.score}
				standing={i + 1}
			/>
		{/if}
	{/each}
</div>

<style>
	.podium {
		display: flex;
	}
</style>
