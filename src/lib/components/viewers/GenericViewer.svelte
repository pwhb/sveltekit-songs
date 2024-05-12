<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ColorType from '$lib/constants/tailwind';
	import { showToast } from '$lib/stores/toast';
	import { closeModal, openModal } from '$lib/utils/dialog';
	import { DocumentMode } from '$lib/constants/common';
	import { parseDate } from '$lib/utils/formatters';
	import DefaultDialog from '../dialog/DefaultDialog.svelte';
	import { API_PATH } from '$lib/constants/constants';
	import MESSAGES from '$lib/constants/messages';

	export let mode: DocumentMode;

	const { tableConfig, details: detailsRes, slug, optionsConfig } = $page.data;

	const details = mode === DocumentMode.Create ? {} : detailsRes.data;
	const payload = {
		...details
	};

	let isLoading = false;

	const handleSubmit = async () => {
		try {
			isLoading = true;
			const url = `${API_PATH}/${slug}${mode === DocumentMode.Create ? '' : `/${details._id}`}`;

			const res = await fetch(url, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: mode === DocumentMode.Create ? 'POST' : 'PATCH',
				body: JSON.stringify(payload)
			});

			const data = await res.json();
			if (data.message && data.message === MESSAGES.SUCCESS) {
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
		const url = `${API_PATH}/${slug}/${details._id}`;
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

<div class="overflow-x-auto mx-auto max-w-md">
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
							{:else if column.type === 'preview'}
								{#if payload[column.value]}
									<img
										src={payload[column.value]}
										alt={payload[column.label]}
										class="m-3 h-10 border-2"
									/>
								{/if}
								<input type="text" class="input input-xs" bind:value={payload[column.value]} />
							{:else if column.type === 'boolean'}
								<input type="checkbox" class="toggle" bind:checked={payload[column.value]} />
							{:else if column.type === 'select'}
								<select class="select select-xs" bind:value={payload[column.value]}>
									{#each optionsConfig[column.value] as { label, value }}
										<option {value}>{label}</option>
									{/each}
								</select>
							{:else if column.type === 'multi-select'}
								<select class="select select-xs" bind:value={payload[column.value]} multiple>
									{#each optionsConfig[column.value] as { label, value }}
										<option {value}>{label}</option>
									{/each}
								</select>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
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
