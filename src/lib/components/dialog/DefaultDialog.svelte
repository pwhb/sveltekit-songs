<script>
	export let modalId = 'default_dialog';
	export let title = '';
	export let text = '';
	export let disabled = false;
	export let onSubmit = () => {};
</script>

<!-- Open the modal using ID.showModal() method -->
<dialog id={modalId} class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">{title}</h3>
		<p class="py-4">{text}</p>
		<div class="modal-action">
			<button class="text-white btn btn-error" on:click={onSubmit} {disabled}>Confirm</button>
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
