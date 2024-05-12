<script>
	import { page } from '$app/stores';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Toast from '$lib/components/toasts/Toast.svelte';
	import '../app.css';
</script>

<div class="min-h-screen" data-theme="light">
	<div class="px-2 md:px-10">
		<Navbar />
		<slot />
		<Toast />
	</div>
</div>
