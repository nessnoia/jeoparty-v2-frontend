<script lang="ts">
	import { goto } from '$app/navigation';
	import ModalBase from './ModalBase.svelte';

	export let isVisible = false;
	export let to: string;

	const navigateToNext = () => {
		goto(to);
	};
</script>

{#if isVisible}
	<ModalBase on:close={() => (isVisible = false)}>
		<div slot="content">
			<p>You might have unsaved changes. Are you sure you want to leave the page?</p>
			<button on:click={() => navigateToNext()}>Leave Page</button>
		</div>
	</ModalBase>
{/if}
