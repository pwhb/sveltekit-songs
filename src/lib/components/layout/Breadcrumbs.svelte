<script lang="ts">
	import { page } from '$app/stores';

	import { getBreadcrumbs } from '$lib/utils/formatters';
</script>

<div class="mx-10 my-3 breadcrumbs">
	<ul>
		{#each getBreadcrumbs($page.url.pathname) as breadcrumb}
			<li><a href={breadcrumb.href} class="lowercase">{breadcrumb.label}</a></li>
		{/each}
	</ul>
</div>
