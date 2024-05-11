<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { API_PATH } from '$lib/constants/constants';
	import MESSAGES from '$lib/constants/messages';
	import ColorType from '$lib/constants/tailwind';
	import { showToast } from '$lib/stores/toast';
	import { getUrlFromQuery } from '$lib/utils/common';
	import { closeModal, openModal } from '$lib/utils/dialog';
	import { parseDate } from '$lib/utils/formatters';
	import DefaultDialog from '../dialog/DefaultDialog.svelte';
	import TableHead from './TableHead.svelte';
	const { slug, tableConfig, selectConfig } = $page.data;

	const query = Object.fromEntries($page.url.searchParams);
	const searchQuery: any = {
		...query,
		active: true
	};

	let idToBeDeleted: string = '';
	let isLoading = false;
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
		<tr>
			<td></td>
			{#each tableConfig.columns as column}
				{#if column.displayable}
					{#if column.type === 'date'}
						<td> </td>
					{:else if column.type === 'boolean'}
						<td>
							<input type="checkbox" class="toggle" bind:checked={searchQuery[column.label]} />
						</td>
					{:else if column.type === 'select'}
						<td>
							<select
								class="w-20 select-xs select select-bordered"
								bind:value={searchQuery[column.label]}
							>
								<!-- {#each selectConfig[column.value] as select}
									<option value={select.value}>{select.label}</option>
								{/each} -->
							</select>
						</td>
					{:else}
						<td>
							<input
								type="text"
								class="w-20 input input-xs input-bordered"
								bind:value={searchQuery[column.label]}
							/>
						</td>
					{/if}
				{/if}
			{/each}
			<td>
				<a class="btn btn-xs btn-primary" href={getUrlFromQuery($page.url.pathname, searchQuery)}
					>search</a
				>
				<a class="text-white btn btn-xs btn-error" href={$page.url.pathname}>clear</a>
			</td>
		</tr>
		{#each $page.data[slug].data as row, idx}
			<tr class="hover">
				<td>{idx + 1 + $page.data[slug].page * $page.data[slug].size}</td>
				{#each tableConfig.columns as column}
					{#if column.displayable}
						{#if column.type === 'date'}
							<td>{parseDate(row[column.value])}</td>
						{:else if column.type === 'boolean'}
							<td>
								<span
									class={`badge text-white ${row[column.value] ? 'badge-success' : 'badge-error'}`}
								>
									{row[column.value]}
								</span>
							</td>
						{:else if column.type === 'preview'}
							<td>
								{#if row[column.value]}
									<img src={row[column.value]} alt={row[column.label]} class="mx-auto h-10" />
								{/if}
							</td>
						{:else if column.type === 'select'}
							<td
								><span class={`badge badge-outline badge-ghost}`}
									>{row[column.value] ? row[column.value] : '-'}
								</span>
							</td>
						{:else}
							<td>{row[column.value] ? row[column.value] : '-'}</td>
						{/if}
					{/if}
				{/each}
				<td>
					<a class="btn btn-xs btn-neutral" href={`/bean-noodle/${slug}/${row._id}`}>view</a>
					<a class="btn btn-xs btn-primary" href={`/bean-noodle/${slug}/${row._id}/edit`}>edit</a>
					<button
						class="text-white btn btn-xs btn-error"
						on:click={() => {
							idToBeDeleted = row._id;
							openModal('delete_item');
						}}>delete</button
					>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<div class="my-6 w-full text-center">
	<div class="join">
		{#if $page.data[slug].page > 0}
			<a
				class="join-item btn btn-xs"
				href={getUrlFromQuery($page.url.pathname, {
					...Object.fromEntries($page.url.searchParams),
					page: $page.data[slug].page - 1
				})}>«</a
			>
		{/if}
		<button class="join-item btn btn-xs disabled"
			>page {$page.data[slug].page} / {Math.floor($page.data[slug].count / $page.data[slug].size)}
		</button>
		{#if $page.data[slug].page < Math.floor($page.data[slug].count / $page.data[slug].size)}
			<a
				class="join-item btn btn-xs"
				href={getUrlFromQuery($page.url.pathname, {
					...Object.fromEntries($page.url.searchParams),
					page: $page.data[slug].page + 1
				})}>»</a
			>
		{/if}
	</div>
</div>
