<script lang="ts">
	import { enhance } from '$app/forms';

	let gameType = 'standard';
</script>

<div id="content">
	<h1>Create New Game</h1>
	<form method="POST" use:enhance>
		<div id="create-form">
			<div id="title">
				<label for="title">Title: </label>
				<div />
				<input name="title" type="text" />
			</div>

			<div id="radio-buttons">
				<label for="radio">Type:</label>
				<div id="buttons">
					<div class:active={gameType === 'standard'} class="radio-option">
						<label for="standard">Standard</label>
						<input
							bind:group={gameType}
							name="type"
							type="radio"
							id="standard"
							value="standard"
							checked
						/>
					</div>

					<div class:active={gameType === 'custom'} class="radio-option">
						<label for="custom">Custom</label>
						<input bind:group={gameType} name="type" type="radio" id="custom" value="custom" />
					</div>
				</div>
			</div>
			<!-- <label>
		Tags
		<input type="text" />
	</label> -->
			<button id="create" type="submit">Create</button>
		</div>
	</form>
</div>

<style>
	h1 {
		text-align: center;
		margin: 8% 0 1.5em 0;
	}

	#content {
		padding: 0 var(--gutter-size-other);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}

	#create-form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		gap: 1em;
		min-width: var(--min-width);
	}

	#title {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		gap: 3em;
		width: 100%;
	}

	#title input {
		flex-grow: 1;
		margin-right: 5%;
	}

	#radio-buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 5.8em;
		width: 100%;
	}

	#radio-buttons {
		flex-grow: 1;
	}

	#buttons {
		flex-grow: 1;
		display: flex;
		flex-direction: row;
		gap: 1em;
		margin-right: 5%;
	}

	.radio-option {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1em;
		padding: 0.5em 1em;
		border: 1px solid var(--black);
		border-radius: 0.2em;
		width: 50%;
	}

	.radio-option input {
		appearance: none;
		border: none;
		background-color: transparent;
		position: fixed;
		opacity: 0;
		pointer-events: none;
	}

	.radio-option input:checked {
		background-color: transparent;
	}

	.radio-option.active {
		border: 2.2px solid var(--black);
		border-radius: 0.2em;
	}

	.radio-option label {
		color: var(--black);
		text-transform: uppercase;
		text-align: center;
		width: 100%;
	}

	.radio-option.active label {
		font-weight: bold;
	}

	#create {
		padding: 0.7em 2em;
		margin: 1.5em auto;
		width: 40%;
		background-color: var(--black);
		color: var(--white);
		border: none;
		border-radius: 0.2em;
		font-weight: bold;
		font-size: medium;
		text-transform: uppercase;
	}

	#create:hover {
		cursor: pointer;
	}
</style>
