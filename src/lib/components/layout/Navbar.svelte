<script>
	import { page } from '$app/stores';
	import AppName from './AppName.svelte';
	import NavIcon from './NavIcon.svelte';

	const { user } = $page.data;
</script>

<div class="px-2 rounded-md shadow-md md:px-10 navbar bg-base-100">
	<div class="flex-1">
		<AppName />
	</div>
	<div class="flex-none gap-2">
		<div class="form-control">
			<input type="text" placeholder="Search" class="w-24 input input-bordered md:w-auto" />
		</div>

		{#if user}
			<NavIcon />
		{/if}
	</div>
</div>
