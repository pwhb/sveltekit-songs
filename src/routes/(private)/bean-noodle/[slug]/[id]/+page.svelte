<script>
	import { page } from '$app/stores';
	import GenericViewer from '$lib/components/viewers/GenericViewer.svelte';
	import { DocumentMode } from '$lib/constants/common';
	
	const { details: detailsRes } = $page.data;

	const details = detailsRes.data;
	let payload = {
		...details
	};

	async function handleSubmit() {
		// await submitForm(slug, DocumentMode.Edit, payload, details._id);
	}

	async function handleDelete() {
		// await deleteDocument(slug, detailsRes.data._id);
	}
</script>

<GenericViewer mode={DocumentMode.View} {handleDelete} {handleSubmit} bind:payload />
