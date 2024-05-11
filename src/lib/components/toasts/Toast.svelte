<script>
	import { toastText, toastType, toastVisible } from '$lib/stores/toast';
</script>

{#if $toastVisible}
	<div class="toast toast-top toast-end">
		{#if $toastType === 'success'}
			<div class="text-white alert alert-success">
				<span>{$toastText}</span>
			</div>
		{:else if $toastType === 'error'}
			<div class="text-white alert alert-error">
				<span>{$toastText}</span>
			</div>
		{/if}
	</div>
{/if}
