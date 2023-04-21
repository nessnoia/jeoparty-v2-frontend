<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate, goto } from '$app/navigation';
	import type { PageData } from './$types';
	import * as Colyseus from 'colyseus.js';
	import { PUBLIC_COLYSEUS_URL } from '$env/static/public';
	import PlayerDetailed from '$lib/components/play/PlayerDetailed.svelte';
	import { roomStore } from '$lib/colyseus-client';

	export let data: PageData;

	let gameId = data.gameId;
	let gameCode = data.code.code;

	let playerList: Record<any, any> = {};

	if (browser) {
		let client = new Colyseus.Client(PUBLIC_COLYSEUS_URL);
		client.create('jeoparty', { gameCode }).then((room) => {
			roomStore.set(room);
			sessionStorage.setItem('roomId', room.id);
			sessionStorage.setItem('sessionId', room.sessionId);
			room.onStateChange((state) => {
				(state as any).players.onAdd = (player: any, key: any) => {
					playerList[key] = player;
				};
				(state as any).players.onRemove = (_: any, key: any) => {
					delete playerList[key];
					playerList = playerList;
				};
			});
			// For some reason it seems to default to the last game state, so this is to make sure it starts fresh.
			room.send('updateGameState', { state: 'join' });
		});
	}

	const startGame = () => {
		goto(`/round/1/${gameId}`);
	};
</script>

<h1>Jeoparty!</h1>

<h4>Join Code: {gameCode}</h4>
<h5>Join at INSERT LINK</h5>

{#each Object.values(playerList) as player}
	<PlayerDetailed
		name={player.name}
		character={player.character}
		colour={player.colour}
		score={0}
	/>
{/each}

<!-- {#if Object.keys(playerList).length >= 1} -->
<button on:click={startGame}>Start Game</button>
<!-- {/if} -->
