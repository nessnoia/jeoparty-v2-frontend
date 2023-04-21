<script lang="ts">
	import { roomStore } from '$lib/colyseus-client';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';
	import PlayerScore from './PlayerScore.svelte';

	export let players: Player[];
	export let buzzerWinner: Player | undefined;
</script>

{#each players as player, i}
	{#if i < 3}
		<PlayerScore name={player.name} score={player.score} />
	{/if}
{/each}

{#if buzzerWinner}
	<PlayerScore name={buzzerWinner.name} score={buzzerWinner.score} />
{:else}
	<div />
{/if}
