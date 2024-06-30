<script lang="ts">
	import { page } from '$app/stores';
	import GenericViewer from '$lib/components/viewers/GenericViewer.svelte';
	import { DocumentMode } from '$lib/constants/common';

	function handleDelete() {}
	function handleSubmit() {}
</script>

<p class="text-center">Hello <span class="font-bold">{$page.data.user.username}!</span></p>
<GenericViewer
	mode={DocumentMode.View}
	{handleDelete}
	{handleSubmit}
	bind:payload={$page.data.user}
	buttons={[]}
></GenericViewer>
