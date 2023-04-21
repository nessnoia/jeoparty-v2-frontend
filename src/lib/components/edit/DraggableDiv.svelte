<script lang="ts">
	import { isCategoryUpdate, isClueUpdate, isRoundUpdate } from '$lib/update-models/game-data';

	export let updateArray: any[] | undefined;

	export const drop = (event: DragEvent, target: number, item: any) => {
		if (event.dataTransfer) {
			const obj = JSON.parse(event.dataTransfer.getData('text/plain'));
			const sentItem = obj.item;
			const start = obj.start;

			let canDrop = false;
			if (isRoundUpdate(item) && isRoundUpdate(sentItem)) {
				canDrop = true;
			} else if (isCategoryUpdate(item) && isCategoryUpdate(sentItem)) {
				if (item.roundId === sentItem.roundId) {
					canDrop = true;
				}
			} else if (isClueUpdate(item) && isClueUpdate(sentItem)) {
				if (item.roundId === sentItem.roundId && item.categoryId === sentItem.categoryId) {
					canDrop = true;
				}
			}

			if (canDrop) {
				event.dataTransfer.dropEffect = 'move';
				const newArrayOrder = updateArray;
				if (obj.start < target) {
					newArrayOrder?.splice(target + 1, 0, newArrayOrder[start]);
					newArrayOrder?.splice(start, 1);
				} else {
					newArrayOrder?.splice(target, 0, newArrayOrder[start]);
					newArrayOrder?.splice(start + 1, 1);
				}
				updateArray = newArrayOrder;
				event.stopPropagation();
			}
		}
	};

	export const dragStart = (event: DragEvent, start: number, item: any) => {
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.dropEffect = 'move';
			let object = {
				start: start,
				item: item
			};
			event.dataTransfer.setData('text/plain', JSON.stringify(object));
			event.stopPropagation();
		}
	};
</script>

<div
	on:dragstart
	on:drop
	on:dragover|preventDefault={() => {
		return false;
	}}
	draggable={true}
>
	<slot />
</div>

<style>
	div {
		width: 100%;
	}
</style>
