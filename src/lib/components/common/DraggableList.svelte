<script>
	// @ts-nocheck

	import { flip } from 'svelte/animate';
	import DraggableListItem from './DraggableListItem.svelte';

	export let payload;
	export let colTypes;

	let hovering = false;

	// @ts-ignore
	const drop = (event, target) => {
		event.dataTransfer.dropEffect = 'move';
		const start = parseInt(event.dataTransfer.getData('text/plain'));
		const newTracklist = payload['columns'];

		if (start < target) {
			newTracklist.splice(target + 1, 0, newTracklist[start]);
			newTracklist.splice(start, 1);
		} else {
			newTracklist.splice(target, 0, newTracklist[start]);
			newTracklist.splice(start + 1, 1);
		}
		payload['columns'] = newTracklist;
		// @ts-ignore
		hovering = null;
	};

	// @ts-ignore
	const dragstart = (event, i) => {
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.dropEffect = 'move';
		const start = i;
		event.dataTransfer.setData('text/plain', start);
	};
</script>

{#each payload['columns'] as col, idx (col.label)}
	<tr
		animate:flip
		draggable={true}
		on:dragstart={(event) => dragstart(event, idx)}
		on:drop|preventDefault={(event) => drop(event, idx)}
		ondragover="return false"
		on:dragenter={() => (hovering = idx)}
		class:is-active={hovering === idx}
	>
		<DraggableListItem {col} {colTypes} bind:payload {idx} />
	</tr>
{/each}

<tr>
	<td class="text-center" colspan={4}>
		<button
			class="mt-6 text-white btn btn-xs btn-success"
			type="button"
			on:click={() => {
				payload.columns = [
					...payload.columns,
					{
						label: '',
						value: '',
						type: '',
						editable: false
					}
				];
			}}>add more column+</button
		>
	</td>
</tr>
