<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import TailwindTypes from '$lib/consts/TailwindTypes';
	import { showToast } from '$lib/stores/toast';
	import { closeModal, openModal } from '$lib/utils/dialog';
	import { DocumentMode } from '$lib/utils/enums';
	import { parseDate } from '$lib/utils/formatters';
	import { extractSelectedIds } from '$lib/utils/structures';
	import RecursiveRadioList from '../common/RecursiveRadioList.svelte';
	import DefaultDialog from '../dialog/DefaultDialog.svelte';
	export let mode: DocumentMode;

	const { tableConfig, details: detailsRes, slug, selectConfig } = $page.data;

	const details = detailsRes.data;

	const payload = {
		...detailsRes.data
	};

	let menuTree: any = selectConfig.menuTree;

	let isLoading = false;

	const handleSubmit = async () => {
		try {
			isLoading = true;
			const url = `/api/${slug}${mode === DocumentMode.Create ? '' : `/${details._id}`}`;

			const { menus, permissions } = extractSelectedIds(menuTree);
			payload.menus = menus;
			payload.permissions = permissions;

			const res = await fetch(url, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: mode === DocumentMode.Create ? 'POST' : 'PATCH',
				body: JSON.stringify(payload)
			});
			const data = await res.json();
			if (data.success) {
				goto(`/bean-noodle/${slug}`);
				showToast(
					mode === DocumentMode.Create
						? 'Created Successfully! Redirecting ...'
						: 'Updated Successfully! Redirecting ...'
				);
			}
		} catch (e) {
			console.error(e);
		} finally {
			isLoading = false;
		}
	};
</script>

<DefaultDialog
	modalId="delete_item"
	title="Are you sure?"
	text={`Are you sure you want to delete ${details._id}?`}
	onSubmit={async () => {
		isLoading = true;
		const url = `/api/${slug}/${details._id}`;
		const res = await fetch(url, {
			method: 'DELETE'
		});

		const data = await res.json();

		isLoading = false;
		closeModal('delete_item');
		if (data.success) {
			showToast('Deleted Successfully!', TailwindTypes.error);
			goto(`/bean-noodle/${slug}`);
		}
	}}
	disabled={isLoading}
/>

<div class="overflow-x-auto mx-auto max-w-xl">
	<form on:submit={handleSubmit}>
		<table class="table">
			<tbody>
				<!-- row 1 -->
				{#if mode !== DocumentMode.Create}
					<tr>
						<th>objectId</th>
						<td>{details['_id']}</td>
					</tr>
				{/if}
				{#each tableConfig.columns as column}
					<tr>
						<th>{column.label}</th>
						<td>
							{#if mode === DocumentMode.View || !column.editable}
								<p class="input input-xs input-ghost">
									{column.type === 'date'
										? parseDate(details[column.value])
										: details[column.value]}
								</p>
							{:else if column.type === 'string'}
								<input type="text" class="input input-xs" bind:value={payload[column.value]} />
							{:else if column.type === 'boolean'}
								<input type="checkbox" class="toggle" bind:checked={payload[column.value]} />
							{/if}
						</td>
					</tr>
				{/each}
				<br />
			</tbody>
		</table>
		<tr class="overflow-scroll">
			<RecursiveRadioList bind:tree={menuTree} {mode} />
		</tr>
		<div class="flex gap-10 justify-center m-10">
			{#if mode === DocumentMode.Create}
				<button class="text-white btn btn-sm btn-success" type="submit" disabled={isLoading}
					>create</button
				>
			{:else if mode === DocumentMode.Edit}
				<button class="text-white btn btn-sm btn-info" type="submit" disabled={isLoading}
					>save</button
				>
				<button
					class="text-white btn btn-sm btn-error"
					type="button"
					on:click={() => {
						openModal('delete_item');
					}}>delete</button
				>
			{:else}
				<a
					class="text-white btn btn-sm btn-primary"
					href={`/bean-noodle/${slug}/${details._id}/edit`}>edit</a
				>
			{/if}
		</div>
	</form>
</div>
