<script lang="ts">
	import { browser } from '$app/environment';
	import { roomStore } from '$lib/colyseus-client';
	import type { Player } from '$lib/player';
	import type { Room } from 'colyseus.js';

	let player: Player;
	let sessionId = '';

	$: room = $roomStore as Room | undefined;

	$: if (room !== undefined) {
		for (let [id, playerObj] of room.state.players) {
			if (sessionId === id) {
				player = playerObj;
				console.log(player);
				break;
			}
		}
	}

	if (browser) {
		sessionId = sessionStorage.getItem('sessionId') ?? '';
	}
</script>

<h1>Thanks for playing!</h1>
<h2>Final score: ${player?.score ?? ''}</h2>
<h2>Congratulations! You finished in {player?.place ?? ''} place.</h2>
