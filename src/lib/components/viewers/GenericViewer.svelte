<script lang="ts">
	import { page } from '$app/stores';
	import { openModal } from '$lib/utils/dialog';
	import { DocumentMode } from '$lib/constants/common';
	import { parseDate } from '$lib/utils/formatters';
	import DefaultDialog from '../dialog/DefaultDialog.svelte';
	import { isLoading } from '$lib/stores/viewer';

	export let mode: DocumentMode;
	export let handleSubmit: () => void;
	export let handleDelete: () => void;
	export let payload: any;

	const { tableConfig, details: detailsRes, slug, optionsConfig } = $page.data;
</script>

<DefaultDialog
	modalId="delete_item"
	title="Are you sure?"
	text={`Are you sure you want to delete ${detailsRes?.data._id}?`}
	onSubmit={handleDelete}
	disabled={$isLoading}
/>

<div class="overflow-x-auto mx-auto max-w-md">
	<form on:submit={handleSubmit}>
		<table class="table">
			<tbody>
				<!-- row 1 -->
				{#if mode !== DocumentMode.Create}
					<tr>
						<th>objectId</th>
						<td>{detailsRes?.data['_id']}</td>
					</tr>
				{/if}
				{#each tableConfig.columns as column}
					<tr>
						<th>{column.label}</th>
						<td>
							{#if mode === DocumentMode.View || !column.editable}
								<p class="input input-xs input-ghost">
									{column.type === 'date'
										? parseDate(detailsRes?.data[column.value])
										: detailsRes?.data[column.value]}
								</p>
							{:else if column.type === 'string'}
								<input type="text" class="input input-xs" bind:value={payload[column.value]} />
							{:else if column.type === 'image'}
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

				<slot />
			</tbody>
		</table>
		<div class="flex gap-10 justify-center m-10">
			{#if mode === DocumentMode.Create}
				<button class="text-white btn btn-sm btn-success" type="submit" disabled={$isLoading}
					>create</button
				>
			{:else if mode === DocumentMode.Edit}
				<button class="text-white btn btn-sm btn-info" type="submit" disabled={$isLoading}
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
					href={`/bean-noodle/${slug}/${detailsRes?.data._id}/edit`}>edit</a
				>
			{/if}
		</div>
	</form>
</div>
