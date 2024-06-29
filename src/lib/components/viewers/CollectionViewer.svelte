<script lang="ts">
	import DraggableList from '../common/DraggableList.svelte';
	export let payload: any;
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

			<DraggableList {payload} />
		</table>
	</td>
</tr>
