<script lang="ts">
	import { FormType } from '$lib/constants/common';

	export let formType: FormType;
</script>

{#if formType === FormType.TEXT}
	<p>Text</p>
{:else if formType === FormType.SELECT}
	<p>SELECT</p>
{/if}
