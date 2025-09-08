<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	let isVrij: boolean | null = null;

	onMount(() => {
		const eventSource = new EventSource('/');

		eventSource.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				if (typeof data.isVrij === 'boolean') {
					isVrij = data.isVrij;
				}
			} catch (e) {
				console.error('Error parsing SSE data:', e);
			}
		};

		eventSource.onerror = () => {
			console.error('SSE connection error.');
			// The browser will automatically try to reconnect.
		};

		return () => {
			eventSource.close();
		};
	});
</script>

<main>
	<h1>Is de ON5 vrij?</h1>

	<div class="status">
		{#if isVrij === null}
			<p>Een moment geduld, status wordt geladen...</p>
		{:else if isVrij}
			<p class="ja">JA!</p>
		{:else}
			<p class="nee">NEE!</p>
		{/if}
	</div>

	<form method="POST" action="?/toggle" use:enhance>
		<button type="submit">Toggle Status</button>
	</form>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #f0f0f0;
		color: #333;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		text-align: center;
	}

	h1 {
		font-size: clamp(2rem, 10vw, 4rem);
		margin: 0 1rem 1rem;
	}

	.status p {
		font-size: clamp(4rem, 20vw, 8rem);
		font-weight: bold;
		margin: 2rem 0;
		line-height: 1;
	}

	.ja {
		color: #2e7d32; /* A nice green */
	}

	.nee {
		color: #c62828; /* A nice red */
	}

	button {
		padding: 1rem 2rem;
		font-size: 1.5rem;
		cursor: pointer;
		border: none;
		border-radius: 8px;
		background-color: #1976d2;
		color: white;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: #1565c0;
	}
</style>