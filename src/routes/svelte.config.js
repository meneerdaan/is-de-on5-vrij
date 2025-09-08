import adapter from '@sveltejs/adapter-static';
import { readFileSync } from 'fs';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base:
				process.env.NODE_ENV === 'production'
					? JSON.parse(readFileSync('./package.json', 'utf8')).homepage
					: ''
		}
	}
};
export default config;