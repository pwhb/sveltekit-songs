<script lang="ts">
	import { page } from '$app/stores';
	import { parseKey } from '$lib/utils/common';
	import { parseDate } from '$lib/utils/formatters';
	import PreviewTableData from './PreviewTableData.svelte';

	export let row: any;
	export let idx: number;
	export let onDelete: () => void;

	const { slug, tableConfig } = $page.data;
</script>

<tr class="hover">
	<td>{idx + 1 + $page.data[slug].page * $page.data[slug].size}</td>
	{#each tableConfig.columns as column}
		{#if column.displayable}
			{#if column.type === 'date'}
				<td>{parseDate(parseKey(row, column.value))}</td>
			{:else if column.type === 'boolean'}
				<td>
					<span
						class={`badge text-white ${parseKey(row, column.value) ? 'badge-success' : 'badge-error'}`}
					>
						{parseKey(row, column.value)}
					</span>
				</td>
			{:else if column.type === 'preview'}
				<PreviewTableData {row} {column} />
			{:else if column.type === 'image'}
				<td>
					{#if parseKey(row, column.value)}
						<img src={parseKey(row, column.value)} alt={row[column.label]} class="mx-auto h-10" />
					{/if}
				</td>
			{:else if column.type === 'select'}
				<td
					><span class={`badge badge-outline badge-ghost}`}
						>{parseKey(row, column.value) ? row[column.value.replace('Id', '')] : '-'}
					</span>
				</td>
			{:else}
				<td>{parseKey(row, column.value) ? parseKey(row, column.value) : '-'}</td>
			{/if}
		{/if}
	{/each}
	<td>
		<a class="btn btn-xs btn-neutral" href={`/bean-noodle/${slug}/${row._id}`}>view</a>
		<a class="btn btn-xs btn-primary" href={`/bean-noodle/${slug}/${row._id}/edit`}>edit</a>
		<button class="text-white btn btn-xs btn-error" on:click={onDelete}>delete</button>
	</td>
</tr>
