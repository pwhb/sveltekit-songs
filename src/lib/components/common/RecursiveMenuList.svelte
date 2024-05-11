<script lang="ts">
	export let menus: any[] = [];
</script>

{#each menus as menu}
	{#if menu.children && menu.children.length > 0}
		<li>
			<details open>
				<summary>
					{#if menu.icon}
						<img src={menu.icon} alt="icon" class="mx-auto w-6 h-6" />
					{/if}
					{menu.name}</summary
				>
				<ul>
					<svelte:self menus={menu.children} />
				</ul>
			</details>
		</li>
	{:else}
		<li>
			<a href={menu.url}>
				{#if menu.icon}
					<img src={menu.icon} alt="icon" class="mx-auto w-6 h-6" />
				{/if}
				{menu.name}
			</a>
		</li>
	{/if}
{/each}
