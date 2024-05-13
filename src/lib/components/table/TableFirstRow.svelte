<script lang="ts">
	import { page } from '$app/stores';
	import { getUrlFromQuery } from '$lib/utils/common';
	const query = Object.fromEntries($page.url.searchParams);
	const searchQuery: any = {
		...query,
		active: true
	};
	const { tableConfig, optionsConfig } = $page.data;
</script>

<tr>
	<td></td>
	{#each tableConfig.columns as column}
		{#if column.displayable}
			{#if column.type === 'date'}
				<td></td>
			{:else if column.type === 'preview'}
				<td></td>
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
						{#each optionsConfig[column.value] as select}
							<option value={select.value}>{select.label}</option>
						{/each}
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
