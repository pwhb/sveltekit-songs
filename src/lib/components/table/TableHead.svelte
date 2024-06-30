<script lang="ts">
	import { page } from '$app/stores';
	import { ButtonType } from '$lib/constants/common';
	import { getUrlFromQuery } from '$lib/utils/common';
	import { isAllowed } from '$lib/utils/structures';
	const query = Object.fromEntries($page.url.searchParams);
	const { tableConfig } = $page.data;
</script>

<thead>
	<tr>
		<th></th>
		{#each tableConfig.columns as column}
			{#if column.displayable}
				<th>
					<div class="flex flex-row justify-between items-center">
						{column.label}
						<div class="flex flex-col">
							{#if $page.url.searchParams.get('sort_by') !== column.value}
								<a href={getUrlFromQuery($page.url.pathname, { ...query, sort_by: column.value })}>
									<img class="w-4 h-4" src="/sort-up-svgrepo-com.svg" alt="sort-up" />
								</a>
							{/if}
							{#if $page.url.searchParams.get('sort_by') !== '-' + column.value}
								<a
									href={getUrlFromQuery($page.url.pathname, {
										...query,
										sort_by: '-' + column.value
									})}
								>
									<img class="w-4 h-4" src="/sort-down-svgrepo-com.svg" alt="sort-down" />
								</a>
							{/if}
						</div>
					</div>
				</th>
			{/if}
		{/each}
		<th>
			{#if isAllowed([ButtonType.CREATE], $page.data.myPermissions)}
				<a class="text-white btn btn-xs btn-info" href={`${$page.url.pathname}/create`}>create</a>
			{/if}
		</th>
	</tr>
</thead>
