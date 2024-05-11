<script lang="ts">
	import { page } from '$app/stores';
	import { getUrlFromQuery } from '$lib/utils/common';

	const { slug } = $page.data;
</script>

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
