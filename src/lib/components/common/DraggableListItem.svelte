<script lang="ts">
	export let col: any;
	export let colTypes: any;
	export let payload: any;
	export let idx: number;
</script>

<td>
	<input type="text" class="w-24 input input-xs" bind:value={col.label} />
</td>
<td>
	<input type="text" class="w-24 input input-xs" bind:value={col.value} />
</td>
<td>
	<select bind:value={col.type}>
		{#each colTypes as type}
			<option value={type.value}>{type.label}</option>
		{/each}
	</select>
</td>
<td>
	<input type="checkbox" bind:checked={col.editable} />
</td>
<td>
	<input type="checkbox" bind:checked={col.displayable} />
</td>
<td>
	<button
		class="text-white btn btn-xs btn-error"
		on:click={() => {
			// @ts-ignore
			payload.columns = payload.columns.filter((_, i) => i !== idx);
		}}
		type="button"
	>
		delete
	</button>
</td>
