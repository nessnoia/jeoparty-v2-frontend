<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let form: { message?: string };
</script>

<div id="container">
	<div id="login-form">
		<h1>Login</h1>
		<form method="POST" action="?/email" use:enhance>
			<div class="form-item">
				<label for="email"> Email </label>
				<input type="email" name="email" />
			</div>
			<div class="form-item">
				<label for="password"> Password </label>
				<input type="password" name="password" />
			</div>

			<button id="login" formaction="?/email">Login</button>
		</form>

		<a class="login-link" href="/api/oauth?provider=google" target="_blank">Continue with Google</a>
		<a class="login-link" href="/api/oauth?provider=github" target="_blank">Continue with Github</a>
		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}
		<a class="register" href="/register">Create a new account</a>
	</div>
</div>

<style>
	h1 {
		font-size: var(--size-4);
		margin-top: 0;
	}
	#container {
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex-direction: column;
	}
	#login-form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 40%;
		min-width: var(--min-width);
	}

	form {
		display: flex;
		align-items: stretch;
		flex-direction: column;
		gap: 12px;
		width: 80%;
	}

	.form-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.form-item input {
		width: 70%;
		padding: 3px 5px;
	}

	#login {
		padding: 5px;
		margin-bottom: 20px;
		margin-top: 5px;
		font-size: var(--size-10);
	}

	.login-link {
		text-decoration: none;
		border: 1px black solid;
		border-radius: 5px;
		margin: 5px;
		padding: 5px;
		width: 78%;
	}

	.login-link:visited {
		color: black;
	}

	.register {
		margin-top: 5px;
	}
</style>
