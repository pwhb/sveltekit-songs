<script>
	import { page } from '$app/stores';
	import GenericViewer from '$lib/components/viewers/GenericViewer.svelte';
	import { DocumentMode } from '$lib/utils/enums';
</script>

<GenericViewer mode={DocumentMode.Create} />
