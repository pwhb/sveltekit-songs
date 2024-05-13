<script>
	import { page } from '$app/stores';
	import GenericViewer from '$lib/components/viewers/GenericViewer.svelte';
	import { DocumentMode } from '$lib/constants/common';
	import { submitForm, deleteDocument } from '$lib/stores/viewer';

	const { details: detailsRes, slug } = $page.data;

	const details = detailsRes.data;
	let payload = {
		...details
	};

	async function handleSubmit() {
		await submitForm(slug, DocumentMode.Edit, payload, details._id);
	}

	async function handleDelete() {
		await deleteDocument(slug, detailsRes.data._id);
	}
</script>

<GenericViewer mode={DocumentMode.Edit} {handleDelete} {handleSubmit} bind:payload />
