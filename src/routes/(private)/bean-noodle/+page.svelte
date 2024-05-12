<script>
	import RecursiveMenuList from '$lib/components/common/RecursiveMenuList.svelte';

	import { page } from '$app/stores';
	const { menus } = $page.data;
</script>

<ul class="max-w-xs rounded-lg menu menu-xs">
	<RecursiveMenuList {menus} />
</ul>
