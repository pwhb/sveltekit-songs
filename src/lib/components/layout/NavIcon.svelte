<script>
	import { page } from '$app/stores';
	import { getAvatarPlaceholder } from '$lib/utils/common';

	const { user } = $page.data;
</script>

<div class="dropdown dropdown-end">
	<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
		{#if user.avatar}
			<div class="avatar">
				<div class="w-10 rounded-full">
					<img src={user.avatar} class="bg-base-100" alt="avatar" />
				</div>
			</div>
		{:else}
			<div class="avatar placeholder">
				<div class="w-10 rounded-full bg-neutral-focus text-neutral-content">
					<span class="text-sm">{getAvatarPlaceholder(user)}</span>
				</div>
			</div>
		{/if}
	</div>
	<ul class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
		<li>
			<a class="justify-between" href="/">
				Profile
				<span class="badge">New</span>
			</a>
		</li>
		<li><a href="/">Settings</a></li>
		{#if user}
			<li>
				<form action="/logout" method="POST">
					<button type="submit">Log out</button>
				</form>
			</li>
		{/if}
	</ul>
</div>
