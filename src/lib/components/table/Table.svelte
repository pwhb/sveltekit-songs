<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { API_PATH } from '$lib/constants/constants';
	import MESSAGES from '$lib/constants/messages';
	import ColorType from '$lib/constants/tailwind';
	import { showToast } from '$lib/stores/toast';
	import { closeModal, openModal } from '$lib/utils/dialog';
	import DefaultDialog from '../dialog/DefaultDialog.svelte';
	import Pagination from './Pagination.svelte';
	import TableFirstRow from './TableFirstRow.svelte';
	import TableHead from './TableHead.svelte';
	import TableRow from './TableRow.svelte';
	const { slug } = $page.data;

	let idToBeDeleted: string = '';
	let isLoading = false;
	// console.log('page', $page.data);
</script>

<DefaultDialog
	modalId="delete_item"
	title="Are you sure?"
	text={`Are you sure you want to delete ${idToBeDeleted}?`}
	onSubmit={async () => {
		isLoading = true;
		const url = `${API_PATH}/${slug}/${idToBeDeleted}`;
		const res = await fetch(url, {
			method: 'DELETE'
		});

		const data = await res.json();

		isLoading = false;
		closeModal('delete_item');
		if (data.message && data.message === MESSAGES.SUCCESS) {
			showToast('Deleted Successfully!', ColorType.error);
			goto(`/bean-noodle/${slug}`);
		}
	}}
	disabled={isLoading}
/>

<table class="table">
	<!-- head -->
	<TableHead />
	<tbody>
		<!-- row 1 -->
		<TableFirstRow />
		{#each $page.data[slug].data as row, idx}
			<TableRow
				{row}
				{idx}
				onDelete={() => {
					idToBeDeleted = row._id;
					openModal('delete_item');
				}}
			/>
		{/each}
	</tbody>
</table>

<div class="my-6 w-full text-center">
	<Pagination />
</div>
