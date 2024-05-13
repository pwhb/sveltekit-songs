<script>
	import { page } from '$app/stores';
	import GenericViewer from '$lib/components/viewers/GenericViewer.svelte';
	import { DocumentMode } from '$lib/constants/common';
	import { submitForm } from '$lib/stores/viewer';

	const { slug } = $page.data;
	let payload = {};

	async function handleSubmit() {
		await submitForm(slug, DocumentMode.Create, payload);
	}

	async function handleDelete() {}
</script>

<GenericViewer mode={DocumentMode.Create} {handleSubmit} {handleDelete} bind:payload />
