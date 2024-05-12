<script>
	import { page } from '$app/stores';
	import GenericViewer from '$lib/components/viewers/GenericViewer.svelte';
	import { DocumentMode } from '$lib/constants/common';
	console.log('page', $page.data);
</script>

<GenericViewer mode={DocumentMode.Edit} />
