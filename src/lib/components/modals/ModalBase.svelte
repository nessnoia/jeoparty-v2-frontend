<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	let modal: HTMLElement;

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = Array.from(modal.querySelectorAll('*')) as Array<HTMLElement>;
			const tabbable = nodes.filter((n) => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement as HTMLElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	const previouslyFocused =
		typeof document !== 'undefined' && (document.activeElement as HTMLElement);

	if (previouslyFocused) {
		onDestroy(() => {
			previouslyFocused.focus();
		});
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="modal-background" on:click={close} on:keydown={handleKeydown} />

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
	<button on:click={close}><img src="/icons/xmark.svg" alt="close modal" /></button>
	<slot name="content" />
	<slot />
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%, -50%);
		padding: 1em;
		border-radius: 0.5em;
		background: white;
	}

	button {
		display: block;
		background-color: transparent;
		box-shadow: none;
		border: none;
	}

	button:hover {
		cursor: pointer;
	}
</style>
