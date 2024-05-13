<script lang="ts">
	import { page } from '$app/stores';
	import DraggableList from '../common/DraggableList.svelte';
	export let payload: any;
	const { colTypes } = $page.data;
</script>

<tr>
	<th>columns</th>
	<td>
		<table class="table">
			<tr>
				<th>label</th>
				<th>value</th>
				<th>type</th>
				<th>editable</th>
				<th>displayable</th>
				<th>slug:key</th>
			</tr>

			<DraggableList {payload} {colTypes} />
		</table>
	</td>
</tr>
