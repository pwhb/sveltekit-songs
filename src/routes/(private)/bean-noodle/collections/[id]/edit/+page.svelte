<script>
	import { page } from '$app/stores';
	import CollectionViewer from '$lib/components/viewers/CollectionViewer.svelte';
	import GenericViewer from '$lib/components/viewers/GenericViewer.svelte';
	import { DocumentMode } from '$lib/constants/common';
	import { submitForm, deleteDocument } from '$lib/stores/viewer';

	const { details: detailsRes, slug } = $page.data;

	const details = detailsRes ? detailsRes.data : {};
	let payload = {
		...details
	};

	async function handleSubmit() {
		await submitForm(slug, DocumentMode.Edit, payload, details._id);
	}

	async function handleDelete() {
		if (detailsRes) {
			await deleteDocument(slug, detailsRes.data._id);
		}
	}
</script>

<GenericViewer mode={DocumentMode.Edit} {handleDelete} {handleSubmit} bind:payload>
	<CollectionViewer bind:payload />
</GenericViewer>
