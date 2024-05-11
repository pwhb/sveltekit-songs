<script>
	import { page } from '$app/stores';
	const { config } = $page.data;
	const [first, second, third] = config.appName.split(' ');
</script>

<a class="text-xl font-bold lowercase" href="/">
	<span class="text-purple-500">{first}</span> <span class="text-blue-500">{second}</span>
	<span class="text-red-500">{third}</span>
</a>
