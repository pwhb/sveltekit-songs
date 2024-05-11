<script lang="ts">
	import { DocumentMode } from '$lib/constants/common';
	export let tree: any[] = [];
	export let mode: DocumentMode;
</script>

<ul class="flex flex-row gap-10">
	{#each tree as menu}
		<li class="flex">
			<div class="flex flex-col gap-4">
				<div class="flex gap-2 items-center">
					<input
						type="checkbox"
						name="radio-1"
						disabled={mode === DocumentMode.View}
						class="radio"
						bind:checked={menu.selected}
					/>
					<span>{menu.name}</span>
				</div>
				<div class="ml-10">
					{#if menu.children}
						<svelte:self bind:tree={menu.children} {mode} />
					{/if}
					{#if menu.permissions && menu.permissions.length}
						<div class="flex flex-col gap-4">
							{#each menu.permissions as permission}
								<div class="flex gap-2 items-center">
									<input
										type="checkbox"
										name="radio-1"
										disabled={mode === DocumentMode.View}
										class="radio"
										bind:checked={permission.selected}
									/>
									<span>{permission.collection}/{permission.action}</span>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</li>
	{/each}
</ul>
