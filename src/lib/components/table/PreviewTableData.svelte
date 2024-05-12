<script lang="ts">
	import { API_PATH } from '$lib/constants/constants';

	export let row: any;
	export let column: any;

	const [type, extension] = row['ContentType'].split('/');
</script>

<td>
	{#if row[column.value]}
		{#if type === 'image'}
			<img
				src={`${API_PATH}/uploads/${row[column.value]}`}
				alt={row[column.label]}
				class="mx-auto h-10"
			/>
		{:else if type === 'audio'}
			<audio src={`${API_PATH}/uploads/${row[column.value]}`} controls></audio>
		{:else}
			<span>{row[column.value]}</span>
		{/if}
	{/if}
</td>
