<script lang="ts">
	import type { Category } from '$lib/database-models/game-data';

	export let category: Category;
</script>

<div>
	<h3>{category.category}</h3>
</div>
