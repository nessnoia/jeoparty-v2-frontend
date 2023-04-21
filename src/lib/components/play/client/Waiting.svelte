<script lang="ts">
	import { Circle3 } from 'svelte-loading-spinners';
</script>

<slot />

<Circle3
	size="60"
	ballTopLeft="#000000"
	ballTopRight="red"
	ballBottomLeft="blue"
	ballBottomRight="green"
	unit="px"
	duration="2s"
/>
