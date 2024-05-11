<script lang="ts">
	import type { ActionData } from './$types';

	let showPassword = false;

	export let form: ActionData;
</script>

<div class="min-h-screen hero bg-base-200">
	<div class="w-full max-w-sm shadow-2xl card bg-base-100">
		<div class="card-body item">
			<div class="items-center p-0 text-center card-body">
				<h2 class="card-title">Sign in to your account</h2>
			</div>

			<form action="" method="POST">
				<div class="form-control">
					<label class="label" for="username">
						<span class="label-text">Username</span>
					</label>
					<input
						type="text"
						id="username"
						name="username"
						placeholder="username"
						class={`input input-bordered ${form?.error?.username ? 'input-error' : ''}`}
						value={form?.previous?.username || ''}
					/>
					{#if form?.error?.username}
						<p class="my-2 text-error">{form.error.username}</p>
					{/if}
				</div>

				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input
						type={showPassword ? 'text' : 'password'}
						id="password"
						name="password"
						placeholder="password"
						class={`input input-bordered ${form?.error?.password ? 'input-error' : ''}`}
					/>
					{#if form?.error?.password}
						<p class="my-2 text-error">{form.error.password}</p>
					{/if}
				</div>
				<div class="form-control">
					<label class="cursor-pointer label">
						<span class="label-text">Show Password</span>
						<input
							type="checkbox"
							bind:checked={showPassword}
							class="checkbox checkbox-secondary"
						/>
					</label>
				</div>
				<div class="form-control">
					<button class="btn btn-primary" type="submit">Login</button>
				</div>
			</form>
		</div>
	</div>
</div>
